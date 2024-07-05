'use server';

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { auth, signIn, signOut } from "./auth";
import { getBookings } from "./data-service";
import { supabase } from "./supabase";

export async function updateGuest(formData) {
  const session = await auth();

  if (!session) throw new Error('You must be signed in!');

  const nationalID = formData.get('nationalID');
  const [nationality, countryFlag] = formData.get('nationality').split('%');

  if (!/^[a-zA-Z0-9]{6,12}$/.test(nationalID)) throw new Error('Please provide a valid national ID');

  const updateData = {
    nationalID,
    nationality,
    countryFlag
  };

  const { error } = await supabase
    .from('guests')
    .update(updateData)
    .eq('id', session.user.guestId);

  if (error) throw new Error('Guest could not be updated');

  revalidatePath('/account/profile');
}

export async function deleteReservation(bookingId) {
  const session = await auth();

  if (!session) throw new Error('You must be signed in!');

  const guestBookings = await getBookings(session.user.guestId);
  const guestBookingsIds = guestBookings.map(booking => booking.id);

  if (!guestBookingsIds.includes(bookingId)) throw new Error('You are not allowed to delete this reservation');

  const { error } = await supabase
    .from('bookings')
    .delete()
    .eq('id', bookingId);

  if (error) throw new Error('Booking could not be deleted');

  revalidatePath('/account/reservations');
}

export async function updateBooking(formData) {
  const bookingId = Number(formData.get('bookingId'));

  // 1) Authentication
  const session = await auth();
  if (!session) throw new Error('You must be signed in!');

  // 2) Authorization
  const guestBookings = await getBookings(session.user.guestId);
  const guestBookingsIds = guestBookings.map(booking => booking.id);

  if (!guestBookingsIds.includes(bookingId)) throw new Error('You are not allowed to delete this reservation');

  // 3) Build update data
  const updateData = {
    numGuests: Number(formData.get('numGuests')),
    observations: formData.get('observations').slice(0, 1000),
  };

  // 4) Mutation
  const { error } = await supabase
    .from('bookings')
    .update(updateData)
    .eq('id', bookingId);

  // 5) Error handling
  if (error) throw new Error('Booking could not be updated');

  // 6) Revalidation and redirect
  revalidatePath(`/account/reservations/edit/${bookingId}`);
  revalidatePath('/account/reservations');
  redirect('/account/reservations');
}

export async function signInAction() {
  await signIn('google', {
    redirectTo: '/account',
  });
}

export async function signOutAction() {
  await signOut({
    redirectTo: '/',
  });
}