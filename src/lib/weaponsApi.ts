import { MOCK_WEAPONS } from "@/data/mockWeapons";
import type { ClassWeaponsResponse, Weapon } from "@/types/weapons";

const LOADOUTS_API_URL = import.meta.env.VITE_LOADOUTS_API_URL || "/.netlify/functions/weapons";

const isValidWeapon = (weapon: Partial<Weapon>): weapon is Weapon => {
  return Boolean(
    weapon.id &&
      weapon.classId &&
      weapon.name &&
      weapon.slot &&
      weapon.description &&
      (weapon.imageUrl === undefined || typeof weapon.imageUrl === "string") &&
      weapon.stats &&
      Array.isArray(weapon.tips),
  );
};

export const fetchClassWeapons = async (classId: string): Promise<ClassWeaponsResponse> => {
  try {
    const response = await fetch(`${LOADOUTS_API_URL}?classId=${encodeURIComponent(classId)}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch weapons for ${classId}`);
    }

    const payload = (await response.json()) as ClassWeaponsResponse;

    if (!payload?.classId || !Array.isArray(payload?.weapons)) {
      throw new Error("Invalid weapons payload format");
    }

    return {
      classId: payload.classId,
      weapons: payload.weapons.filter(isValidWeapon),
    };
  } catch {
    return (
      MOCK_WEAPONS[classId] ?? {
        classId,
        weapons: [],
      }
    );
  }
};

