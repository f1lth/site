// TODO: generate enums that we can use generally instead of importing from specific queries like this
import { Effects } from "api/fragments/menu-product.graphql";

const EFFECT_DISPLAY_NAME_MAP = new Map<Effects, string>([
  [Effects.Happy, "Happy"],
  [Effects.Relaxed, "Relaxed"],
  [Effects.Calm, "Calm"],
  [Effects.Sleepy, "Sleepy"],
  [Effects.Energetic, "Energetic"],
  [Effects.Creative, "Creative"],
]);

export function displayNameForEffect(effect: Effects): string {
  return EFFECT_DISPLAY_NAME_MAP.get(effect) || "unknown";
}
