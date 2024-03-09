import axios from "axios";
import { create } from "zustand"

enum ROLE {
    USER,
    ADMIN
}

const store = (set: any) => ({
    matches: [{ id: 0, team_A: '', team_B: '', slug_1: '', slug_2: '', score_A: 0, score_B: 0, matchId: '', matchDate: '', matchStatus: '', referee: '', timeLapsed: 0 }],
    teams: [{ team_name: '', slug: '', totalPoints: 0, totalMatches: 0, group: '', goalNumber: 0, id: 0, createdAt: new Date(), updatedAt: new Date() }],
    user: [{ email: '', username: '', role: ROLE }],
    currentMatch: [{ id: 0, team_A: '', team_B: '', slug_1: '', slug_2: '', score_A: 0, score_B: 0, matchId: '', matchDate: '', matchStatus: '', referee: '', timeLapsed: 0 }],
    loading: true,
    refereeValue: '',
    updateRefereeValue: (newRefereeValue: string) => {
        set({ refereeValue: newRefereeValue })
    },
    updateStatus: async (id: number) => {
        const res = await axios.put('/api/match', { id });
    },
    getCurrentMatch: async () => {
        const res = await axios.get('/api/match');
        set({ currentMatch: await res.data, loading: await false });
    },
    getUser: async () => {
        const res = await axios.get('/api/user');
        set({ user: await res.data, loading: await false });
    },
    getTeams: async () => {
        const res = await axios.get('/api/team');
        set({ teams: await res.data, loading: await false });
    },
    getMatches: async () => {
        const res = await axios.get('/api/match');
        set({ matches: await res.data, loading: await false });
    }
})

export const useStore = create(store);