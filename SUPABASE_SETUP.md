# Supabase Setup Instructions

## 1. Get Your Supabase Credentials

1. Go to your Supabase project dashboard: https://app.supabase.com
2. Navigate to **Settings** → **API**
3. Copy the following values:
   - **Project URL** (looks like: `https://xxxxxxxxxxxxx.supabase.co`)
   - **anon/public key** (the long string under "Project API keys")

## 2. Configure Environment Variables

1. Open the `.env.local` file in the root directory
2. Replace the placeholder values with your actual credentials:

```env
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-actual-anon-key-here
```

## 3. Create the Leaderboard Table

1. In your Supabase dashboard, go to **SQL Editor**
2. Click **New Query**
3. Paste the following SQL and click **Run**:

```sql
-- Create leaderboard table
CREATE TABLE leaderboard (
  id BIGSERIAL PRIMARY KEY,
  initials TEXT NOT NULL,
  score INTEGER NOT NULL,
  kills INTEGER NOT NULL,
  time TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create index for faster sorting by score
CREATE INDEX idx_leaderboard_score ON leaderboard(score DESC);

-- Enable Row Level Security (RLS)
ALTER TABLE leaderboard ENABLE ROW LEVEL SECURITY;

-- Allow anyone to read leaderboard entries
CREATE POLICY "Allow public read access"
  ON leaderboard
  FOR SELECT
  TO public
  USING (true);

-- Allow anyone to insert new entries
CREATE POLICY "Allow public insert access"
  ON leaderboard
  FOR INSERT
  TO public
  WITH CHECK (true);
```

## 4. Verify Setup

1. Restart your development server: `npm run dev`
2. Play the game and complete level 5
3. Enter your initials and press Enter
4. Double-click the controller icon to view the leaderboard
5. Check your Supabase dashboard → **Table Editor** → **leaderboard** to see the entry

## 5. Features

- **Persistent Storage**: Scores are saved to Supabase and persist across sessions
- **Global Leaderboard**: All players share the same leaderboard
- **Fallback**: If Supabase is unavailable, falls back to localStorage
- **Top 50**: Only the top 50 scores are displayed
- **Sorted**: Automatically sorted by highest score first

## Troubleshooting

### Leaderboard not saving?
- Check browser console for errors
- Verify your `.env.local` credentials are correct
- Make sure the table was created successfully in Supabase
- Check that RLS policies are enabled

### Can't see other players' scores?
- Make sure you're using the same Supabase project
- Verify the RLS policies allow public read access
- Check the Table Editor in Supabase to see if entries exist
