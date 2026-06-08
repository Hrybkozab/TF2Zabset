// User Types
export interface User {
  id: number;
  steamId: string;
  username: string;
  avatar: string | null;
  profileUrl: string;
  country: string | null;
  createdAt: string;
  updatedAt: string;
}

// Steam Types
export interface SteamProfile {
  steamId: string;
  username: string;
  avatar: string;
  profileUrl: string;
  country: string | null;
  playtimeHours: number;
  achievementsCount: number;
}

export interface SteamStats {
  playtimeHours: number;
  achievementsCount: number;
  totalKills?: number;
  totalDeaths?: number;
}

// Guide Types
export interface Guide {
  id: number;
  title: string;
  content: string;
  tf2Class: string | null;
  tags: string[];
  published: boolean;
  createdAt: string;
  updatedAt: string;
  username: string;
  avatar: string | null;
  avgRating: number;
  ratingCount: number;
}

export interface CreateGuideInput {
  title: string;
  content: string;
  tf2Class?: string;
  tags: string[];
  published: boolean;
}

export interface UpdateGuideInput {
  title?: string;
  content?: string;
  tf2Class?: string;
  tags?: string;
  published?: boolean;
}

// TF2 Class Types
export type TF2Class = 
  | 'Scout'
  | 'Soldier'
  | 'Pyro'
  | 'Demoman'
  | 'Heavy'
  | 'Engineer'
  | 'Medic'
  | 'Sniper'
  | 'Spy';

// API Response Types
export interface ApiResponse<T> {
  data: T;
  error?: string;
}

export interface ApiError {
  message: string;
  statusCode?: number;
}

// Auth Types
export interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: () => void;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
}

// Match Types
export interface MatchLog {
  id: number;
  steamId: string;
  logId: string;
  title: string;
  map: string;
  date: string;
  kills: number;
  deaths: number;
  assists: number;
  damage: number;
  heals: number;
  createdAt: string;
}

export interface TF2CenterMatch {
  id: number;
  userId: number;
  matchId: string;
  title: string;
  map: string;
  date: string;
  result: string;
  createdAt: string;
}
