'use server'

import { Customer } from '@/types/schema'
import { revalidatePath } from 'next/cache'

export async function createCustomer(data: Customer) {
    // Implement your database logic here
    // For example, using Prisma:
    // const result = await prisma.Customer.create({ data })

    // Revalidate the path after successful creation
    console.log("Visa Application", data);
    // revalidatePath('/visa-applications')

    return { success: true }
}

export async function updateCustomer(id: number, data: Partial<Customer>) {
    // Implement your database update logic here
    // For example, using Prisma:
    // const result = await prisma.Customer.update({ where: { id }, data })

    // Revalidate the path after successful update
    // revalidatePath('/visa-applications')
    console.log("Visa Application update", data);
    return { success: true }
}