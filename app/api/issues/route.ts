import { NextRequest, NextResponse } from "next/server";
import {z} from "zod";
import {prisma} from "@/prisma/client";

const Issueschema= z.object({
    title: z.string().min(1).max(255),
    description: z.string().min(1)
});

export async function POST(request:NextRequest){
    const body = await request.json();

    const validation = Issueschema.safeParse(body);

    if(!validation.success){
        return NextResponse.json(validation.error.format(),{status:400});
        
    }

    const newIssue= await prisma.iSSUE.create({
        data:{title:body.title, description: body.description}
    })

    return NextResponse.json(newIssue,{status:201});


}

export async function GET(request: NextRequest){
    const page = parseInt(request.nextUrl.searchParams.get("page") || "1", 10);
    const pageSize = 10;
    const currentPage = Number.isNaN(page) || page < 1 ? 1 : page;

    const [issues, totalCount] = await Promise.all([
        prisma.iSSUE.findMany({
            orderBy:{
                createdAt:"desc"
            },
            skip: (currentPage - 1) * pageSize,
            take: pageSize,
        }),
        prisma.iSSUE.count(),
    ]);

    return NextResponse.json({
        issues,
        totalCount,
        page: currentPage,
        pageSize,
    });

}
