"use server"

import { cookies } from 'next/headers'

// Types for User
type User = {
  username: string
  password: string
}

// Login Function
async function login(data: User) {

    try {

        // API Call to Login
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL_API}/Authenticate/login`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })

        if(response.ok) {

            const data = await response.json()

            // Save Token in Cookies
            cookies().set('token', data.token, {
              maxAge: 60 * 60 * 24, // 1 day
            })

            console.log(data)
            return { success: true, data }
        } else {
            const data = await response.json()
            return { success: false, error: data }
        }

    } catch (error) {
        console.error('An error occurred during the login process:', error)
        return { success: false, error }
    }

}

// Logout Function
async function logout() {
    try {
      // Make a POST request to the logout API
      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL_API}/Authenticate/logout`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      if (response.ok) {

        // Remove the token from the cookies
        cookies().set('token', '', {
          maxAge: 0,
        })

        return { success: true }
      } else {
        return { success: false }
      }      
    } catch (error) {
        console.error('An error occurred during the logout process:', error)
        return { success: false, error }
    }
}

export { login, logout }