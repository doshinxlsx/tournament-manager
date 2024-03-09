'use client'

import { useStore } from "@/store";
import Link from "next/link";
import { useEffect } from "react";

export default function Board() {
    const { teams, getTeams, loading } = useStore((state) => ({
        teams: state.teams,
        getTeams: state.getTeams,
        loading: state.loading
    }));

    const sortedTeams = teams.sort((a, b) => a.group < b.group ? -1 : 1)

    useEffect(() => {
        getTeams();
    }, [getTeams])

    return (
        <main className="flex min-h-screen items-center justify-center">
            <section className="flex min-w-8 flex-col relative overflow-x-auto shadow-md sm:rounded-lg">
                <div className="flex">
                    <Link href='/' className="font-semibold flex p-2">Vissza</Link>
                </div>
                <table className="w-full text-sm text-left text-gray-500">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                        <tr className="text-md">
                            <th scope="col" className="px-6 py-3">
                                Csapat neve
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Lejátszott meccsek
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Összpontszám
                            </th>
                            {/* <th /> */}
                        </tr>
                    </thead>
                    <tbody>
                        {loading &&
                            <tr className="bg-white border-b hover:bg-gray-50">
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                    .
                                </th>
                                <td className="px-6 py-4">
                                    .
                                </td>
                                <td className="px-6 py-4">
                                    .
                                </td>
                            </tr>
                        }
                        {!loading && sortedTeams.map((team, key) => (
                            <tr key={`team-id-${key}`} className={`${team.group === 'A' ? 'bg-white border-b-white hover:bg-gray-50' : 'bg-gray-600 border-b-gray-600 hover:bg-gray-500'}`}>
                                <th scope="row" className={`${team.group === 'A' ? 'px-6 py-4 font-medium text-black whitespace-nowrap' : 'px-6 py-4 font-medium text-white whitespace-nowrap'}`}>
                                    {team.team_name}
                                </th>
                                <td className={`${team.group === 'A' ? 'px-6 py-4 text-black' : 'px-6 py-4 text-white'}`}>
                                    {team.totalMatches}
                                </td>
                                <td className={`${team.group === 'A' ? 'px-6 py-4 text-black' : 'px-6 py-4 text-white'}`}>
                                    {team.totalPoints}
                                </td>
                                {/* <td>
                                    <Link href='/' className={`${team.group === 'A' ? 'px-6 py-4 font-medium text-black whitespace-nowrap' : 'px-6 py-4 font-medium text-white whitespace-nowrap'}`}>Szerkeszt</Link>
                                </td> */}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </section>
        </main >
    );
}
