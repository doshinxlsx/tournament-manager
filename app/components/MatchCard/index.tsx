'use client';
import MatchCardHeader from "./MatchCardHeader";
import { useStore } from "@/store";
import { format } from "date-fns";
import { hu } from "date-fns/locale";
import { EditIcon } from "../icons/edit";
import { useSession } from "next-auth/react";
import { updateReferee } from "@/app/helpers/updateReferee";
import Modal from "../EditModal";

export default function MatchCard() {
    const { data: session } = useSession();
    const { matches, refereeValue } = useStore((state) => ({
        matches: state.matches,
        refereeValue: state.refereeValue,
    }));

    return (
        <section className="flex flex-col md:min-w-96 min-w-full rounded-lg match-shadow">
            <MatchCardHeader />

            {matches.map((match, key) => (
                <section key={`section-${key}`} className="flex relative bg-white rounded-b">

                    {match.matchStatus === "ONGOING" && (
                        <>
                            <div className="column">
                                <div className="team team--home">
                                    <div className="team-logo">
                                        <img src={'/team.png'} alt='Team A' className="block w-4" />
                                    </div>
                                    <h2 className="team-name">{match.team_A}</h2>
                                </div>
                            </div>

                            <div className="column">
                                <div className="flex flex-col items-center">
                                    <div className="match-date">
                                        <strong>{format(match.matchDate, 'Pp', { locale: hu })}</strong>
                                    </div>
                                    <div className="mt-3 flex items-center">
                                        <span className={`${match.score_A > match.score_B ? 'match-score-number leading' : 'match-score-number'}`}>{match.score_A}</span>

                                        <span className="match-score-divider text-2xl font-bold leading-none">:</span>

                                        <span className={`${match.score_B > match.score_A ? 'match-score-number leading' : 'match-score-number'}`}>{match.score_B}</span>
                                    </div>
                                    {/* <div className="match-time-lapsed text-sm font-semibold mt-2">{match.timeLapsed}'</div> */}
                                    <div className="match-referee mt-3 flex">
                                        Bíró: <strong className="font-semibold mx-1">{match.referee}</strong>
                                    </div>
                                </div>
                            </div>

                            <div className="column">
                                <div className="team team--away">
                                    <div className="team-logo">
                                        <img src={'/team.png'} alt='Team B' className="block w-2" />
                                    </div>
                                    <h2 className="team-name">{match.team_B}</h2>
                                </div>
                            </div>
                        </>
                    )}

                    {match.matchStatus !== 'ONGOING' && (
                        <div className="flex w-full justify-center"><h2 className="font-bold text-gray-600">Jelenleg nincs meccs.</h2></div>
                    )}

                    {session?.user.role === 'ADMIN' && <Modal referee={match.referee} matchId={match.id} />}

                </section>
            ))}

        </section>
    );
}
