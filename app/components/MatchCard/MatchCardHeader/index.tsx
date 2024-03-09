import { useSession } from "next-auth/react";
import Link from "next/link";

export default function MatchCardHeader() {
    const { data: session } = useSession();

    return (
        <section className='flex justify-between p-4 border-bottom relative bg-white rounded-t'>
            <div className='match-status px-2 py-3 rounded-md font-semibold text-xs md:text-sm flex items-center leading-none '>Live</div>
            <div className='flex items-center text-sm md:text-md font-semibold'><img className="w-6 mr-1" src={'/cup.png'} alt='Amateur Cup' />Amateur Cup</div>
            {session?.user && session?.user.role === 'ADMIN' && (
                <>
                    <Link href='?modal=true'>
                        <button type='button' data-modal-target="crud-modal" data-modal-toggle="crud-modal" className="font-bold p-2">
                            +
                        </button>
                    </Link>
                </>
            )}
            <Link href='/board' className="font-semibold md:text-md text-sm flex justify-center items-center">
                Tabella
            </Link>
        </section>
    );
}
