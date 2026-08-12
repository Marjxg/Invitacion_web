import { NextResponse } from "next/server";
import { supabaseServer } from "@/utils/supabase/server";

export async function POST(request: Request) {
    try {
        const body = await request.json();

        const token = body.token;
        const confirmedCount = Number(body.confirmedCount);

        if (!token || typeof token !== "string") {
            return NextResponse.json(
                { message: "Token inválido" },
                { status: 400 }
            );
        }

        if (!Number.isInteger(confirmedCount) || confirmedCount < 0) {
            return NextResponse.json(
                { message: "Cantidad de asistentes inválida" },
                { status: 400 }
            );
        }

        const { data: guest, error: findError } = await supabaseServer
            .from("guests")
            .select("id, name, guest_count, confirmed, confirmed_count")
            .eq("token", token)
            .single();

        if (findError || !guest) {
            return NextResponse.json(
                { message: "Invitación no encontrada" },
                { status: 404 }
            );
        }

        if (guest.confirmed !== null) {
            return NextResponse.json(
                { message: "Esta invitación ya tiene una respuesta registrada" },
                { status: 409 }
            );
        }

        if (confirmedCount > guest.guest_count) {
            return NextResponse.json(
                {
                    message: `Esta invitación permite un máximo de ${guest.guest_count} personas`,
                },
                { status: 400 }
            );
        }

        const { error: updateError } = await supabaseServer
            .from("guests")
            .update({
                confirmed: confirmedCount > 0,
                confirmed_count: confirmedCount,
                confirmed_at: new Date().toISOString(),
                updated_at: new Date().toISOString(),
            })
            .eq("id", guest.id);

        if (updateError) {
            console.error("Error actualizando RSVP:", updateError);

            return NextResponse.json(
                { message: "No se pudo registrar la respuesta" },
                { status: 500 }
            );
        }

        return NextResponse.json({
            message:
                confirmedCount > 0
                    ? "Asistencia confirmada"
                    : "Respuesta registrada",
            responded: true,
            confirmed: confirmedCount > 0,
            confirmedCount,
        });
    } catch (error) {
        console.error("Error RSVP:", error);

        return NextResponse.json(
            { message: "Ocurrió un error inesperado" },
            { status: 500 }
        );
    }
}