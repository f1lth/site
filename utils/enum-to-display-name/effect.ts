// TODO: generate enums that we can use generally instead of importing from specific queries like this
import { Effects } from "api/fragments/menu-product.graphql";

const EFFECT_DISPLAY_NAME_MAP = new Map<Effects, string>([
  [Effects.Calm, "Calm"],
  [Effects.ClearMind, "Clear Mind"],
  [Effects.Creative, "Creative"],
  [Effects.Energetic, "Energetic"],
  [Effects.Focused, "Focused"],
  [Effects.Happy, "Happy"],
  [Effects.Inspired, "Inspired"],
  [Effects.Relaxed, "Relaxed"],
  [Effects.Sleepy, "Sleepy"],
  [Effects.Uplifted, "Uplifted"],
]);

export function displayNameForEffect(effect: Effects): string {
  return EFFECT_DISPLAY_NAME_MAP.get(effect) || "unknown";
}
