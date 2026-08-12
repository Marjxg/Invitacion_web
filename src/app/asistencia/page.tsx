import { supabaseServer } from "@/utils/supabase/server";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function AttendancePage() {
    const { data: guests, error } = await supabaseServer
        .from("guests")
        .select("id, name, guest_count, confirmed, confirmed_count, confirmed_at")
        .order("name", { ascending: true });

    if (error) {
        console.error("Error obteniendo asistencia:", error);

        return (
            <main className="flex min-h-screen items-center justify-center bg-stone-50 px-5">
                <p className="text-stone-600">
                    No se pudo cargar la información de asistencia.
                </p>
            </main>
        );
    }

    const totalInvitations = guests?.length ?? 0;

    const responded = guests?.filter(
        (guest) => guest.confirmed !== null
    ).length ?? 0;

    const pending = totalInvitations - responded;

    const attendingInvitations = guests?.filter(
        (guest) => guest.confirmed === true
    ).length ?? 0;

    const notAttending = guests?.filter(
        (guest) => guest.confirmed === false
    ).length ?? 0;

    const totalGuests = guests?.reduce(
        (total, guest) => total + guest.guest_count,
        0
    ) ?? 0;

    const confirmedPeople = guests?.reduce(
        (total, guest) => total + (guest.confirmed_count ?? 0),
        0
    ) ?? 0;

    return (
        <main className="min-h-screen bg-linear-to-b from-violet-50 via-stone-50 to-violet-100 px-5 py-12 sm:px-8">
            <div className="mx-auto w-full max-w-6xl">
                <div className="text-center">
                    <h1 className="mt-2 font-serif text-4xl text-violet-900 sm:text-5xl">
                        Control de asistencia
                    </h1>
                </div>

                <div className="mt-10 grid grid-cols-2 gap-4 lg:grid-cols-4">
                    <SummaryCard
                        label="Invitaciones"
                        value={totalInvitations}
                    />

                    <SummaryCard
                        label="Invitaciones respondidas"
                        value={responded}
                    />

                    <SummaryCard
                        label="Invitaciones pendientes"
                        value={pending}
                    />

                    <SummaryCard
                        label="Invitaciones sí asistirán"
                        value={attendingInvitations}
                    />
                </div>

                <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">

                    <SummaryCard
                        label="Personas invitadas"
                        value={totalGuests}
                    />

                    <SummaryCard
                        label="No asistirán"
                        value={notAttending}
                    />


                    <SummaryCard
                        label="Personas confirmadas"
                        value={confirmedPeople}
                    />
                </div>

                <div className="mt-10 overflow-hidden rounded-3xl border border-violet-100 bg-white shadow-sm">
                    <div className="border-b border-violet-100 px-5 py-4 sm:px-7">
                        <h2 className="font-serif text-2xl text-violet-900">
                            Invitados
                        </h2>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full min-w-180 text-left">
                            <thead className="bg-violet-50/70">
                                <tr className="text-xs uppercase tracking-wider text-stone-500">
                                    <th className="px-5 py-4 font-medium">Invitado</th>
                                    <th className="px-5 py-4 text-center font-medium">
                                        Invitados
                                    </th>
                                    <th className="px-5 py-4 text-center font-medium">
                                        Confirmados
                                    </th>
                                    <th className="px-5 py-4 text-center font-medium">
                                        Estado
                                    </th>
                                    <th className="px-5 py-4 font-medium">
                                        Fecha respuesta
                                    </th>
                                </tr>
                            </thead>

                            <tbody className="divide-y divide-stone-100">
                                {guests?.map((guest) => (
                                    <tr key={guest.id} className="text-sm text-stone-600">
                                        <td className="px-5 py-4 font-medium text-stone-700">
                                            {guest.name}
                                        </td>

                                        <td className="px-5 py-4 text-center">
                                            {guest.guest_count}
                                        </td>

                                        <td className="px-5 py-4 text-center">
                                            {guest.confirmed_count ?? "—"}
                                        </td>

                                        <td className="px-5 py-4 text-center">
                                            <AttendanceStatus confirmed={guest.confirmed} />
                                        </td>

                                        <td className="px-5 py-4">
                                            {guest.confirmed_at
                                                ? new Intl.DateTimeFormat("es-GT", {
                                                    dateStyle: "medium",
                                                    timeStyle: "short",
                                                    timeZone: "America/Guatemala",
                                                }).format(new Date(guest.confirmed_at))
                                                : "—"}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </main>
    );
}

function SummaryCard({
    label,
    value,
}: {
    label: string;
    value: number;
}) {
    return (
        <div className="rounded-2xl border border-violet-100 bg-white/80 px-4 py-5 text-center shadow-sm backdrop-blur-sm">
            <p className="font-serif text-3xl text-violet-900">
                {value}
            </p>

            <p className="mt-1 text-xs uppercase tracking-wider text-stone-500">
                {label}
            </p>
        </div>
    );
}

function AttendanceStatus({
    confirmed,
}: {
    confirmed: boolean | null;
}) {
    if (confirmed === null) {
        return (
            <span className="inline-flex rounded-full bg-amber-50 px-3 py-1 text-xs font-medium text-amber-700">
                Pendiente
            </span>
        );
    }

    if (confirmed) {
        return (
            <span className="inline-flex rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700">
                Asistirá
            </span>
        );
    }

    return (
        <span className="inline-flex rounded-full bg-rose-50 px-3 py-1 text-xs font-medium text-rose-700">
            No asistirá
        </span>
    );
}