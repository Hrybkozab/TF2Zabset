export type WeaponSlot = "primary" | "secondary" | "melee";

export interface WeaponStats {
  damage?: string;
  fireRate?: string;
  clipSize?: string;
  ammo?: string;
  utility?: string;
}

export interface Weapon {
  id: string;
  classId: string;
  name: string;
  slot: WeaponSlot;
  description: string;
  imageUrl?: string;
  stats: WeaponStats;
  tips: string[];
}

export interface ClassWeaponsResponse {
  classId: string;
  weapons: Weapon[];
}

