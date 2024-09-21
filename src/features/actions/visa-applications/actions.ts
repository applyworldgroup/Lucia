'use server'

import { VisaApplication } from '@/types/schema'
import { revalidatePath } from 'next/cache'

export async function createVisaApplication(data: VisaApplication) {
    // Implement your database logic here
    // For example, using Prisma:
    // const result = await prisma.visaApplication.create({ data })

    // Revalidate the path after successful creation
    console.log("Visa Application", data);
    // revalidatePath('/visa-applications')

    return { success: true }
}

export async function updateVisaApplication(id: number, data: Partial<VisaApplication>) {
    // Implement your database update logic here
    // For example, using Prisma:
    // const result = await prisma.visaApplication.update({ where: { id }, data })

    // Revalidate the path after successful update
    // revalidatePath('/visa-applications')
    console.log("Visa Application update", data);
    return { success: true }
}