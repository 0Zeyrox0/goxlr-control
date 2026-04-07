import { PluginSDK } from '@logitech/plugin-sdk';
import {
  FaderAMute, FaderAVolume,
  FaderBMute, FaderBVolume,
  FaderCMute, FaderCVolume,
  FaderDMute, FaderDVolume,
  CoughMuteToggle,
} from './src/test-actions';

const pluginSDK = new PluginSDK();

// Fader A - Mic
pluginSDK.registerAction(new FaderAMute());
pluginSDK.registerAction(new FaderAVolume());

// Fader B - Game
pluginSDK.registerAction(new FaderBMute());
pluginSDK.registerAction(new FaderBVolume());

// Fader C - Chat
pluginSDK.registerAction(new FaderCMute());
pluginSDK.registerAction(new FaderCVolume());

// Fader D - System
pluginSDK.registerAction(new FaderDMute());
pluginSDK.registerAction(new FaderDVolume());

// Cough
pluginSDK.registerAction(new CoughMuteToggle());

await pluginSDK.connect();