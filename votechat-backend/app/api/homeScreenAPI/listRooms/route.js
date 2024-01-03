import { connectMongoDB } from "../../../../lib/mongodb";
import Salas from "../../../../models/salas";
import { NextResponse } from "next/server";
import verifyToken from "../../verifyTokenFunction";

export async function POST(req) {
    try {
        // Access the data from the verifyToken function
        const { id_user, token } = await verifyToken(req.headers.get('authorization'));

        // Connect to MongoDB
        await connectMongoDB();

        // Fetch data from MongoDB
        const salasUsuario = await Salas.find({ 'members.id_user': id_user }).exec()

        /*
            Process and format the room data as needed.
        */

        // Return the information as a response to the request
        return NextResponse.json({ roomData: salasUsuario, token: token, success: true });
    } catch (error) {
        console.error("Error in POST request:", error);
        return NextResponse.json({ message: "Internal Server Error", success: false });
    }
}