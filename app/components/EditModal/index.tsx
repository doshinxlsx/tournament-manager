'use client'
import { updateReferee } from "@/app/helpers/updateReferee";
import { useStore } from "@/store";
import axios from "axios";
import { useFormik } from "formik";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

type ModalType = {
    referee: string;
    matchId: number;
}

export default function Modal({ referee, matchId }: ModalType) {
    const { updateRefereeValue, refereeValue } = useStore((state) => ({
        updateRefereeValue: state.updateRefereeValue,
        refereeValue: state.refereeValue
    }))
    const router = useRouter();
    const searchParams = useSearchParams();
    const modal = searchParams.get("modal");
    const pathname = usePathname();

    const formik = useFormik({
        initialValues: {
            referee: referee,
            score_a: 0,
            score_b: 0,
        },
        onSubmit: () => updateReferee(matchId, refereeValue)
    })

    return (
        <>
            <div id="crud-modal" tabIndex={-1} aria-hidden="true" className="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
                <div className="relative p-4 w-full max-w-md max-h-full">
                    <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                        <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                Meccs szerkesztes
                            </h3>
                            <button type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center" data-modal-toggle="crud-modal">
                                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                </svg>
                                <span className="sr-only">Ablak bezaras</span>
                            </button>
                        </div>
                        <form className="p-4 md:p-5" onSubmit={formik.handleSubmit}>
                            <div className="grid gap-4 mb-4 grid-cols-2">
                                <div className="col-span-2">
                                    <label htmlFor="referee" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Biro neve</label>
                                    <input type="text" value={refereeValue} onChange={(e) => updateRefereeValue(e.target.value)} name="referee" id="referee" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="Ird be a jatekvezeto nevet" />
                                </div>
                                <div className="col-span-2 sm:col-span-1">
                                    <label htmlFor="score_a" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Elso csapat golszam</label>
                                    <input type="number" {...formik.getFieldProps('score_a')} name="score_a" id="score_a" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="0" />
                                </div>
                                <div className="col-span-2 sm:col-span-1">
                                    <label htmlFor="score_b" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Masodik csapat golszam</label>
                                    <input type="number" {...formik.getFieldProps('score_b')} name="score_b" id="score_b" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="0" />
                                </div>
                            </div>
                            <div className="flex justify-between">
                                <button type="submit" className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                                    <svg className="me-1 -ms-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd"></path></svg>
                                    Megerosit
                                </button>
                                <button type="button" onClick={() => router.push(pathname)} className="text-white inline-flex items-center bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                                    Bezar
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

        </>
    );
}
