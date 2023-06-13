import { NextResponse, NextRequest } from "next/server";
import Cookies from "js-cookie";

export default function middleware(req) {
    // const verify = Cookies.get('loggedIn');
    const verify = req.cookies.get('loggedIn');
    const url = req.url;
    if (verify && url.includes('/login')) {
        return NextResponse.redirect(process.env.NEXT_PUBLIC_MIDDLEWARE_BASEURL + '/mi-cuenta')
    }

    if (!verify && url.includes('/mi-cuenta')) {
        return NextResponse.redirect(process.env.NEXT_PUBLIC_MIDDLEWARE_BASEURL + '/login')
    }
}