# 🎛️ GoXLR Utility Control — Logi Actions SDK Plugin

Control your **TC-Helicon GoXLR** directly from the **Logi Options+ Action Ring** using the [GoXLR Utility](https://github.com/GoXLR-on-Linux/goxlr-utility) API.

No more alt-tabbing. No more reaching for faders mid-game. Just trigger the Action Ring and adjust your audio on the fly.

---

## Features

- **Fader Volume Control** — Adjust volume for all four faders (A–D) using scroll/dial input
- **Fader Mute Toggle** — Mute/unmute each fader with a single button press
- **Cough Button** — Toggle cough mute, just like the physical button on your GoXLR

| Action | Type | Description |
|---|---|---|
| Fader A Volume (Mic) | Adjustment | Scroll to adjust Mic volume |
| Fader A Mute (Mic) | Command | Toggle Mic mute |
| Fader B Volume (Game) | Adjustment | Scroll to adjust Game volume |
| Fader B Mute (Game) | Command | Toggle Game mute |
| Fader C Volume (Chat) | Adjustment | Scroll to adjust Chat volume |
| Fader C Mute (Chat) | Command | Toggle Chat mute |
| Fader D Volume (System) | Adjustment | Scroll to adjust System volume |
| Fader D Mute (System) | Command | Toggle System mute |
| Cough Button | Command | Toggle Cough mute |

---

## Prerequisites

- **Windows 10/11**
- **[Logi Options+](https://www.logitech.com/software/logi-options-plus)** (v1.83 or higher)
- A compatible **Logitech MX device** (MX Master, MX Keys, MX Creative Console, etc.)
- **[GoXLR Utility](https://github.com/GoXLR-on-Linux/goxlr-utility/releases)** installed and running
- **TC-Helicon GoXLR** or **GoXLR Mini**

> **Important:** This plugin communicates with GoXLR Utility, not the official GoXLR App. You need to switch to GoXLR Utility for this plugin to work. Your existing profiles can be imported — see the [GoXLR Utility docs](https://github.com/GoXLR-on-Linux/goxlr-utility#readme) for details.

---

## Installation

### From Release

1. Download the latest `.lplug4` file from [Releases](../../releases)
2. Double-click the file — Logi Plugin Service will install it automatically
3. Open **Logi Options+** and find the plugin under your installed plugins
4. Assign actions to your **Action Ring** or device buttons

### From Source

```bash
git clone https://github.com/YOUR_USERNAME/goxlr-control.git
cd goxlr-control
npm install
npm run watch
```
to build it

```bash
npm run build
```



The plugin will automatically link to Logi Plugin Service and appear in Logi Options+.

---

## Configuration

No configuration needed. The plugin auto-detects your GoXLR by querying the GoXLR Utility API on `localhost:14564`.

Make sure GoXLR Utility is running before using the plugin. If the utility is not reachable, actions will silently fail without crashing.

### Fader Mapping

The default fader mapping follows the standard GoXLR layout:

| Fader | Channel |
|---|---|
| A | Mic |
| B | Game |
| C | Chat |
| D | System |

If your fader assignment differs, you can modify the channel names in `src/test-actions.ts`.

---

## How It Works

The plugin sends HTTP commands to the GoXLR Utility's REST API:

- **Volume** — `SetVolume` with a value between 0–255
- **Mute** — `SetFaderMuteState` to toggle between `Unmuted` and `MutedToAll`
- **Cough** — `SetCoughMuteState` to toggle between `Unmuted` and `MutedToX`

Volume adjustments are tracked locally to avoid conflicts with the GoXLR's motorized faders.

---

## Tech Stack

- **TypeScript** — Plugin source
- **Logi Actions SDK** (Node.js) — Plugin framework
- **GoXLR Utility API** — Hardware communication

---

## Roadmap

- [ ] Profile switching
- [ ] Effect toggles (Reverb, Echo, Pitch, etc.)
- [ ] Routing table control
- [ ] Sampler triggers
- [ ] Sync mute state from GoXLR on plugin start

---

## Contributing

Contributions are welcome! Feel free to open issues or submit pull requests.

---

## License

MIT — see [LICENSE](LICENSE) for details.

---

## Credits

- [GoXLR Utility](https://github.com/GoXLR-on-Linux/goxlr-utility) by the GoXLR-on-Linux team
- [Logi Actions SDK](https://logitech.github.io/actions-sdk-docs/) by Logitech

---

> **Disclaimer:** This project is not affiliated with TC-Helicon, Logitech(Waiting for approval from Logitech), or the GoXLR Utility team. Use at your own risk.
