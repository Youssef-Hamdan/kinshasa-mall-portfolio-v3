"use server";

import { HIGHLIGHT_THEME_PRESETS } from "@/lib/highlight-theme-presets";
import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { SignJWT } from "jose";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

// ==========================================
// 1. SHOP ACTIONS
// ==========================================

export async function addShop(formData: FormData) {
  const name = formData.get("name") as string;
  const image = formData.get("image") as string;
  const logo = formData.get("logo") as string;
  const description = formData.get("description") as string;
  const category = formData.get("category") as string; 
  const floor = formData.get("floor") as string;

  await prisma.shop.create({ 
    data: { 
      name, 
      image, 
      logo, 
      description, 
      category, 
      floor // Now fully wired to the DB
    } 
  });
  
  revalidatePath("/admin/dashboard");
  revalidatePath("/");
}

export async function updateShop(formData: FormData) {
  const id = formData.get("id") as string;
  const name = formData.get("name") as string;
  const image = formData.get("image") as string;
  const logo = formData.get("logo") as string;
  const description = formData.get("description") as string;
  const category = formData.get("category") as string;
  const floor = formData.get("floor") as string;

  await prisma.shop.update({
    where: { id },
    data: { 
      name, 
      image, 
      logo, 
      description, 
      category, 
      floor 
    },
  });

  revalidatePath("/admin/dashboard");
  revalidatePath("/");
}

export async function deleteShop(id: string) {
  await prisma.shop.delete({ where: { id } });
  revalidatePath("/admin/dashboard");
  revalidatePath("/");
}

// ==========================================
// 2. HIGHLIGHT ACTIONS
// ==========================================

export async function addHighlight(formData: FormData) {
  const title = formData.get("title") as string;
  const img = formData.get("img") as string;
  const sliderName = formData.get("sliderName") as string;
  const desc = formData.get("desc") as string;

  const totalHighlights = await prisma.highlight.count();
  const nextTheme = HIGHLIGHT_THEME_PRESETS[totalHighlights % HIGHLIGHT_THEME_PRESETS.length];

  await prisma.highlight.create({
    data: {
      title,
      img,
      sliderName,
      desc,
      progressBarClass: nextTheme.progressBarClass,
      titleChipClass: nextTheme.titleChipClass,
    },
  });

  revalidatePath("/admin/dashboard");
}

export async function updateHighlight(formData: FormData) {
  const id = formData.get("id") as string;
  const title = formData.get("title") as string;
  const img = formData.get("img") as string;
  const sliderName = formData.get("sliderName") as string;
  const desc = formData.get("desc") as string;

  await prisma.highlight.update({
    where: { id },
    data: { title, img, sliderName, desc },
  });

  revalidatePath("/admin/dashboard");
}

export async function deleteHighlight(id: string) {
  await prisma.highlight.delete({ where: { id } });
  revalidatePath("/admin/dashboard");
}

// ==========================================
// 3. AUTHENTICATION
// ==========================================

const SECRET_KEY = new TextEncoder().encode("kinshasa-mall-super-secret-key");

export async function login(formData: FormData) {
  const password = formData.get("password") as string;
  
  if (password === "admin123") {
    const token = await new SignJWT({ role: "admin" })
      .setProtectedHeader({ alg: "HS256" })
      .setExpirationTime("2h")
      .sign(SECRET_KEY);

    const cookieStore = await cookies();
    cookieStore.set("admin_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 2,
    });
    return { success: true };
  }
  return { success: false, error: "Invalid password" };
}

export async function logout() {
  const cookieStore = await cookies();
  cookieStore.delete("admin_token");
  redirect("/admin/login");
}