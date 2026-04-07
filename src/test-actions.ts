import { CommandAction, AdjustmentAction } from '@logitech/plugin-sdk';

const GOXLR_API = 'http://localhost:14564/api/command';

let cachedSerial: string | null = null;

async function getSerial(): Promise<string> {
  if (cachedSerial) return cachedSerial;
  try {
    const res = await fetch(GOXLR_API, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify('GetStatus'),
    });
    const data = await res.json();
    const mixers = data?.Status?.mixers;
    if (mixers) {
      cachedSerial = Object.keys(mixers)[0];
      return cachedSerial!;
    }
  } catch (e) {
    console.error('Could not get GoXLR serial:', e);
  }
  return '';
}

async function goxlrCommand(command: object) {
  try {
    const serial = await getSerial();
    if (!serial) return;
    await fetch(GOXLR_API, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ Command: [serial, command] }),
    });
  } catch (e) {
    console.error('GoXLR Utility not reachable:', e);
  }
}

// --- Volume Adjustment Base Class ---

class VolumeAdjustment extends AdjustmentAction {
  name = '';
  displayName = '';
  description = '';
  hasReset = false;
  groupName = 'GoXLR Volume';
  protected channel = 'Mic';
  protected step = 5;
  private volume: number | null = null;

  private async ensureVolume() {
    if (this.volume !== null) return;
    try {
      const serial = await getSerial();
      const res = await fetch(
        `http://localhost:14564/api/path?path=$.mixers.${serial}.levels.volumes.${this.channel}`
      );
      const val = await res.json();
      this.volume = typeof val === 'number' ? val : 128;
    } catch {
      this.volume = 128;
    }
  }

  async execute(event: { tick: number }) {
    await this.ensureVolume();
    this.volume = Math.min(255, Math.max(0, this.volume! + event.tick * this.step));
    await goxlrCommand({ SetVolume: [this.channel, this.volume] });
  }
}

// --- Fader A: Mic ---

export class FaderAMute extends CommandAction {
  name = 'goxlr_fader_a_mute';
  displayName = 'Fader A Mute (Mic)';
  description = 'Toggle Mute Fader A';
  groupName = 'GoXLR Mute';
  private muted = false;

  async onKeyDown() {
    this.muted = !this.muted;
    await goxlrCommand({
      SetFaderMuteState: ['A', this.muted ? 'MutedToAll' : 'Unmuted'],
    });
  }
}

export class FaderAVolume extends VolumeAdjustment {
  name = 'goxlr_fader_a_volume';
  displayName = 'Fader A Volume (Mic)';
  description = 'Adjust Fader A volume';
  protected channel = 'Mic';
}

// --- Fader B: Game ---

export class FaderBMute extends CommandAction {
  name = 'goxlr_fader_b_mute';
  displayName = 'Fader B Mute (Game)';
  description = 'Toggle Mute Fader B';
  groupName = 'GoXLR Mute';
  private muted = false;

  async onKeyDown() {
    this.muted = !this.muted;
    await goxlrCommand({
      SetFaderMuteState: ['B', this.muted ? 'MutedToAll' : 'Unmuted'],
    });
  }
}

export class FaderBVolume extends VolumeAdjustment {
  name = 'goxlr_fader_b_volume';
  displayName = 'Fader B Volume (Game)';
  description = 'Adjust Fader B volume';
  protected channel = 'Game';
}

// --- Fader C: Chat ---

export class FaderCMute extends CommandAction {
  name = 'goxlr_fader_c_mute';
  displayName = 'Fader C Mute (Chat)';
  description = 'Toggle Mute Fader C';
  groupName = 'GoXLR Mute';
  private muted = false;

  async onKeyDown() {
    this.muted = !this.muted;
    await goxlrCommand({
      SetFaderMuteState: ['C', this.muted ? 'MutedToAll' : 'Unmuted'],
    });
  }
}

export class FaderCVolume extends VolumeAdjustment {
  name = 'goxlr_fader_c_volume';
  displayName = 'Fader C Volume (Chat)';
  description = 'Adjust Fader C volume';
  protected channel = 'Chat';
}

// --- Fader D: System ---

export class FaderDMute extends CommandAction {
  name = 'goxlr_fader_d_mute';
  displayName = 'Fader D Mute (System)';
  description = 'Toggle Mute Fader D';
  groupName = 'GoXLR Mute';
  private muted = false;

  async onKeyDown() {
    this.muted = !this.muted;
    await goxlrCommand({
      SetFaderMuteState: ['D', this.muted ? 'MutedToAll' : 'Unmuted'],
    });
  }
}

export class FaderDVolume extends VolumeAdjustment {
  name = 'goxlr_fader_d_volume';
  displayName = 'Fader D Volume (System)';
  description = 'Adjust Fader D volume';
  protected channel = 'System';
}

// --- Cough Button ---

export class CoughMuteToggle extends CommandAction {
  name = 'goxlr_cough_mute';
  displayName = 'Cough Button';
  description = 'Toggle Cough Mute';
  groupName = 'GoXLR Mute';
  private muted = false;

  async onKeyDown() {
    this.muted = !this.muted;
    await goxlrCommand({
      SetCoughMuteState: this.muted ? 'MutedToX' : 'Unmuted',
    });
  }
}