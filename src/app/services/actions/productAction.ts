"use server"

import { cookies } from 'next/headers'

// Variables for keeping the token
let token: string | undefined

// Get Token from Cookies
function getToken() {
    if (token) {
        return token
    }
    
    // Get Token from Cookies
    const tokenCookie = cookies().get('token')
    if (tokenCookie) {
        token = tokenCookie.value
        return token
    }
    
    return undefined
}

// ------------------------------
// CRUD Functions for Product
// ------------------------------

// Get All Products
async function getAllProducts() {
    getToken()
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL_API}/Product`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      })
      if (response.ok) {
          return response.json()
      } else {
         throw new Error('Failed to fetch products');
      }
    } catch (error) {
      console.error('An error occurred while fetching products:', error)
      throw new Error('Failed to fetch products');
    }
}

// Create Product
async function createProduct(payload: any) {
  getToken()
  try {

    console.log(payload)

    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL_API}/Product`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      body: payload,
    })
    if (response.ok) {
      const data = await response.json()
      console.log(data)
      return { success: true }
    } else {
       throw new Error('Failed to create product')
    }
    
  } catch (error) {
    console.error('An error occurred while creating product:', error)
  }
}

export { getAllProducts, createProduct }

