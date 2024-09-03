import {
  getBookedDatesByCabinId,
  getCabin,
} from '@/app/_lib/data-service'

export async function GET(_, {params: {cabinId}}) {
  try {
    const [cabin, bookedDates] = await Promise.all([
      getCabin(cabinId),
      getBookedDatesByCabinId(cabinId),
    ])
    return Response.json({cabin, bookedDates})
  } catch (error) {
    return Response.json({error: 'Cabin not found!'})
  }
}
