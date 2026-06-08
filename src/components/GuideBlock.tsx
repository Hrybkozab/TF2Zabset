import { useRef, useState, type CSSProperties } from "react";
import { Check, Edit3, ListPlus, Trash2, Video, X } from "lucide-react";

export type SkillLevel = "beginner" | "intermediate" | "advanced";

export interface GuideBlockData {
  id: number;
  title: string;
  skill: SkillLevel;
  text: string;
  tips: string[];
  ytId: string;
}

function extractYoutubeId(input: string): string {
  const value = input.trim();
  if (!value) return "";

  const directId = value.match(/^[a-zA-Z0-9_-]{11}$/);
  if (directId) return value;

  const urlMatch = value.match(
    /(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/,
  );

  return urlMatch?.[1] ?? "";
}

const SKILL_LABELS: Record<SkillLevel, string> = {
  beginner: "Beginner",
  intermediate: "Intermediate",
  advanced: "Advanced",
};

const SKILL_STYLES: Record<SkillLevel, CSSProperties> = {
  beginner: { background: "#e8f0d8", color: "#3a5a10", border: "1px solid #a8c870" },
  intermediate: { background: "#f0e8d0", color: "#5a3a10", border: "1px solid #c8a050" },
  advanced: { background: "#f0d8d8", color: "#5a1010", border: "1px solid #c87070" },
};

export const DEFAULT_BLOCKS: GuideBlockData[] = [
  {
    id: 1,
    title: "POSITIONING",
    skill: "intermediate",
    text:
      "A Scout's positioning depends on the game itself. If your Medic is struggling in a particular position, draw pressure away from them and buy time for healing or a clean retreat.\n\nLook for targets that are already distracted, slow, isolated, or forced to reload. Scout wins by choosing the fight before the enemy understands that the fight has started.",
    tips: [
      "Keep one escape route available before every duel.",
      "Use cover to break Sniper sightlines before crossing open space.",
      "Attack from side angles when your team begins a push.",
    ],
    ytId: "",
  },
  {
    id: 2,
    title: "PRACTICE ROUTINE",
    skill: "beginner",
    text:
      "Spend a few minutes learning where health packs, flank routes, and safe corners are on the map. Then practice entering a fight, dealing damage, and leaving before the enemy team can collapse on you.\n\nA useful routine is: peek, shoot, relocate, reload, repeat. This keeps you active without feeding.",
    tips: [
      "Practice double-jump direction changes on empty maps.",
      "Record one round and check where you died without an escape route.",
      "Use offline bots or tr_walkway for simple aim warmups.",
    ],
    ytId: "",
  },
  {
    id: 3,
    title: "COMMON MISTAKES",
    skill: "advanced",
    text:
      "The most common Scout mistake is staying in the same angle after being spotted. Once enemies know where you are, they can pre-aim you, call you out, or force you into a bad trade.\n\nAnother mistake is chasing low-health targets too far. If the chase removes you from the objective or your team fight, the kill may not be worth it.",
    tips: [
      "Do not tunnel vision on one target when the objective is being lost.",
      "Avoid jumping in predictable straight lines during Soldier fights.",
      "Leave after forcing attention if your team has already gained space.",
    ],
    ytId: "",
  },
];

interface GuideBlockProps {
  block: GuideBlockData;
  isEditing: boolean;
  onEdit: () => void;
  onSave: () => void;
  onDelete: () => void;
  onChange: (updated: GuideBlockData) => void;
}

function GuideBlockCard({ block, isEditing, onEdit, onSave, onDelete, onChange }: GuideBlockProps) {
  const [ytInput, setYtInput] = useState("");
  const [ytError, setYtError] = useState(false);
  const ytInputRef = useRef<HTMLInputElement>(null);

  function field<K extends keyof GuideBlockData>(key: K, value: GuideBlockData[K]) {
    onChange({ ...block, [key]: value });
  }

  function handleAddYoutube() {
    const id = extractYoutubeId(ytInput);
    if (!id) {
      setYtError(true);
      ytInputRef.current?.focus();
      return;
    }

    setYtError(false);
    setYtInput("");
    field("ytId", id);
  }

  function handleTipsChange(raw: string) {
    field(
      "tips",
      raw
        .split("\n")
        .map((line) => line.trim())
        .filter(Boolean),
    );
  }

  return (
    <article style={{ ...styles.block, ...(isEditing ? styles.blockEditing : {}) }}>
      <header style={styles.header}>
        {isEditing ? (
          <input
            style={{ ...styles.title, ...styles.titleInput }}
            value={block.title}
            onChange={(event) => field("title", event.target.value)}
            aria-label="Block title"
          />
        ) : (
          <h2 style={styles.title}>{block.title}</h2>
        )}

        <div style={styles.actions}>
          {isEditing ? (
            <button style={{ ...styles.iconButton, ...styles.saveButton }} onClick={onSave} type="button">
              <Check size={15} />
              Save
            </button>
          ) : (
            <button style={styles.iconButton} onClick={onEdit} type="button">
              <Edit3 size={14} />
              Edit
            </button>
          )}
          <button style={{ ...styles.iconButton, ...styles.deleteButton }} onClick={onDelete} type="button">
            <Trash2 size={14} />
          </button>
        </div>
      </header>

      <div style={styles.body}>
        {isEditing && (
          <label style={styles.editGroup}>
            <span style={styles.sectionLabel}>Difficulty</span>
            <select
              value={block.skill}
              onChange={(event) => field("skill", event.target.value as SkillLevel)}
              style={styles.select}
            >
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
            </select>
          </label>
        )}

        {isEditing ? (
          <label style={styles.editGroup}>
            <span style={styles.sectionLabel}>Description</span>
            <textarea
              style={styles.textarea}
              value={block.text}
              onChange={(event) => field("text", event.target.value)}
            />
          </label>
        ) : (
          <div style={styles.text}>
            {block.text.split(/\n{2,}/).map((paragraph) => (
              <p key={paragraph} style={styles.paragraph}>
                {paragraph}
              </p>
            ))}
          </div>
        )}

        {isEditing ? (
          <label style={styles.editGroup}>
            <span style={styles.sectionLabel}>Tips, one per line</span>
            <textarea
              style={{ ...styles.textarea, minHeight: 82 }}
              value={block.tips.join("\n")}
              onChange={(event) => handleTipsChange(event.target.value)}
            />
          </label>
        ) : (
          block.tips.length > 0 && (
            <ul style={styles.tipsList}>
              {block.tips.map((tip) => (
                <li key={tip} style={styles.tipItem}>
                  <span style={styles.tipMarker} />
                  {tip}
                </li>
              ))}
            </ul>
          )
        )}

        <div style={styles.metaRow}>
          <span style={{ ...styles.skillBadge, ...SKILL_STYLES[block.skill] }}>{SKILL_LABELS[block.skill]}</span>
        </div>

        {block.ytId ? (
          <div style={styles.videoSection}>
            <div style={styles.videoFrame}>
              <iframe
                style={styles.iframe}
                src={`https://www.youtube.com/embed/${block.ytId}`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                loading="lazy"
                title={`YouTube video for ${block.title}`}
              />
            </div>
            {isEditing && (
              <button style={styles.removeVideoButton} onClick={() => field("ytId", "")} type="button">
                <X size={13} />
                Remove video
              </button>
            )}
          </div>
        ) : (
          isEditing && (
            <div style={styles.videoSection}>
              <span style={styles.sectionLabel}>YouTube video</span>
              <div style={styles.youtubeRow}>
                <input
                  ref={ytInputRef}
                  value={ytInput}
                  onChange={(event) => {
                    setYtInput(event.target.value);
                    setYtError(false);
                  }}
                  onKeyDown={(event) => {
                    if (event.key === "Enter") handleAddYoutube();
                  }}
                  placeholder="Paste YouTube link or video ID"
                  style={{ ...styles.youtubeInput, ...(ytError ? styles.inputError : {}) }}
                />
                <button style={styles.addVideoButton} onClick={handleAddYoutube} type="button">
                  <Video size={14} />
                  Add
                </button>
              </div>
              {ytError && <p style={styles.error}>Use a YouTube link like https://youtu.be/dQw4w9WgXcQ</p>}
            </div>
          )
        )}
      </div>
    </article>
  );
}

interface GuideBlockListProps {
  initialBlocks?: GuideBlockData[];
}

export default function GuideBlockList({ initialBlocks = DEFAULT_BLOCKS }: GuideBlockListProps) {
  const [blocks, setBlocks] = useState<GuideBlockData[]>(initialBlocks);
  const [editingId, setEditingId] = useState<number | null>(null);
  const nextId = useRef(Math.max(100, ...initialBlocks.map((block) => block.id + 1)));

  function updateBlock(updated: GuideBlockData) {
    setBlocks((current) => current.map((block) => (block.id === updated.id ? updated : block)));
  }

  function deleteBlock(id: number) {
    if (!window.confirm("Delete this guide block?")) return;
    setBlocks((current) => current.filter((block) => block.id !== id));
    if (editingId === id) setEditingId(null);
  }

  function addBlock() {
    const id = nextId.current++;
    const newBlock: GuideBlockData = {
      id,
      title: "NEW BLOCK",
      skill: "beginner",
      text:
        "Write the main explanation here. Use an empty line to split the description into readable paragraphs.",
      tips: ["Add one practical tip here.", "Add another tip here."],
      ytId: "",
    };

    setBlocks((current) => [...current, newBlock]);
    setEditingId(id);
  }

  return (
    <div style={styles.list}>
      {blocks.map((block) => (
        <GuideBlockCard
          key={block.id}
          block={block}
          isEditing={editingId === block.id}
          onEdit={() => setEditingId(block.id)}
          onSave={() => setEditingId(null)}
          onDelete={() => deleteBlock(block.id)}
          onChange={updateBlock}
        />
      ))}

      <button onClick={addBlock} style={styles.addBlockButton} type="button">
        <ListPlus size={16} />
        Add new block
      </button>
    </div>
  );
}

const styles: Record<string, CSSProperties> = {
  list: {
    fontFamily: "'Roboto Slab', Georgia, serif",
  },
  block: {
    background: "#f4ede0",
    border: "2px solid #6f4a2a",
    borderRadius: 4,
    marginBottom: "1.25rem",
    overflow: "hidden",
    boxShadow: "4px 4px 0 rgba(38, 25, 13, 0.28)",
  },
  blockEditing: {
    boxShadow: "0 0 0 3px rgba(232, 82, 10, 0.18), 4px 4px 0 rgba(38, 25, 13, 0.28)",
  },
  header: {
    background: "#ead8bb",
    borderBottom: "2px solid #6f4a2a",
    padding: "12px 16px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 10,
  },
  title: {
    margin: 0,
    fontFamily: "'Bebas Neue', Impact, sans-serif",
    fontSize: 28,
    letterSpacing: "0.04em",
    color: "#27180d",
    textTransform: "uppercase",
    flex: 1,
  },
  titleInput: {
    background: "rgba(255,255,255,0.55)",
    border: "1px dashed #8b5e2a",
    borderRadius: 3,
    padding: "2px 8px",
    outline: "none",
  },
  actions: {
    display: "flex",
    alignItems: "center",
    gap: 6,
  },
  iconButton: {
    display: "inline-flex",
    alignItems: "center",
    gap: 5,
    background: "rgba(255,255,255,0.35)",
    border: "1px solid #9f754d",
    borderRadius: 3,
    padding: "5px 9px",
    color: "#5b361a",
    cursor: "pointer",
    fontSize: 12,
    fontWeight: 700,
    fontFamily: "Roboto, sans-serif",
    textTransform: "uppercase",
  },
  saveButton: {
    background: "#7f4a21",
    color: "#fff3df",
    borderColor: "#7f4a21",
  },
  deleteButton: {
    color: "#963022",
    borderColor: "#ba755f",
    padding: "5px 7px",
  },
  body: {
    padding: "16px 18px 18px",
  },
  editGroup: {
    display: "block",
    marginBottom: 12,
  },
  sectionLabel: {
    display: "block",
    fontSize: 11,
    color: "#8a6840",
    fontFamily: "Roboto, sans-serif",
    textTransform: "uppercase",
    letterSpacing: "0.1em",
    marginBottom: 5,
    fontWeight: 700,
  },
  select: {
    fontSize: 13,
    padding: "6px 9px",
    border: "1px solid #b48a5f",
    borderRadius: 3,
    background: "rgba(255,255,255,0.6)",
    color: "#27180d",
    outline: "none",
  },
  textarea: {
    width: "100%",
    minHeight: 150,
    fontSize: 14,
    lineHeight: 1.7,
    color: "#27180d",
    background: "rgba(255,255,255,0.55)",
    border: "1px dashed #8b5e2a",
    borderRadius: 3,
    padding: 10,
    resize: "vertical",
    fontFamily: "'Roboto Slab', Georgia, serif",
    outline: "none",
  },
  text: {
    fontSize: 15,
    lineHeight: 1.75,
    color: "#3a2414",
  },
  paragraph: {
    margin: "0 0 11px",
  },
  tipsList: {
    margin: "12px 0 0",
    padding: 0,
    listStyle: "none",
  },
  tipItem: {
    display: "flex",
    alignItems: "flex-start",
    gap: 9,
    fontSize: 13,
    color: "#4a3318",
    padding: "4px 0",
    lineHeight: 1.5,
    fontFamily: "Roboto, sans-serif",
  },
  tipMarker: {
    width: 7,
    height: 7,
    marginTop: 7,
    background: "#e8520a",
    transform: "rotate(45deg)",
    flexShrink: 0,
  },
  metaRow: {
    marginTop: 12,
  },
  skillBadge: {
    display: "inline-flex",
    fontSize: 11,
    padding: "3px 8px",
    borderRadius: 2,
    fontFamily: "Roboto, sans-serif",
    fontWeight: 700,
    letterSpacing: "0.06em",
    textTransform: "uppercase",
  },
  videoSection: {
    marginTop: 14,
    borderTop: "1px solid #c8a97e",
    paddingTop: 14,
  },
  videoFrame: {
    position: "relative",
    paddingBottom: "56.25%",
    height: 0,
    overflow: "hidden",
    borderRadius: 4,
    border: "1px solid #6f4a2a",
    background: "#1a1209",
  },
  iframe: {
    position: "absolute",
    inset: 0,
    width: "100%",
    height: "100%",
    border: "none",
  },
  youtubeRow: {
    display: "flex",
    gap: 8,
    alignItems: "center",
  },
  youtubeInput: {
    flex: 1,
    minWidth: 0,
    fontSize: 13,
    padding: "8px 10px",
    border: "1px solid #b48a5f",
    borderRadius: 3,
    background: "rgba(255,255,255,0.6)",
    color: "#27180d",
    outline: "none",
    fontFamily: "Roboto, sans-serif",
  },
  inputError: {
    borderColor: "#b74434",
  },
  addVideoButton: {
    display: "inline-flex",
    alignItems: "center",
    gap: 6,
    background: "#7f4a21",
    color: "#fff3df",
    border: "1px solid #7f4a21",
    borderRadius: 3,
    padding: "8px 12px",
    fontSize: 12,
    cursor: "pointer",
    fontFamily: "Roboto, sans-serif",
    fontWeight: 700,
    textTransform: "uppercase",
  },
  removeVideoButton: {
    display: "inline-flex",
    alignItems: "center",
    gap: 5,
    marginTop: 8,
    background: "transparent",
    border: "none",
    color: "#8a6840",
    cursor: "pointer",
    fontSize: 12,
    fontFamily: "Roboto, sans-serif",
    textDecoration: "underline",
  },
  error: {
    margin: "6px 0 0",
    color: "#963022",
    fontSize: 12,
    fontFamily: "Roboto, sans-serif",
  },
  addBlockButton: {
    width: "100%",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 7,
    padding: 12,
    background: "rgba(244,237,224,0.7)",
    border: "2px dashed #8b5e2a",
    borderRadius: 4,
    color: "#6f3f1e",
    fontSize: 13,
    cursor: "pointer",
    fontFamily: "Roboto, sans-serif",
    fontWeight: 700,
    textTransform: "uppercase",
  },
};
