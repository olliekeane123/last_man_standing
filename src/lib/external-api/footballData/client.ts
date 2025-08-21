import { env } from "@/lib/env"
import axios from "axios"

const footballDataClient = axios.create({
    baseURL: "https://api.football-data.org/v4/",
    timeout: 3000,
    headers: {
        "X-Auth-Token": env.FOOTBALL_DATA_ORG_API_KEY,
        "Content-Type": "application/json",
    },
})

footballDataClient.interceptors.request.use(
    (config) => {
        console.log(`Making request to: ${config.baseURL}${config.url}`)
        return config
    },
    (error) => {
        console.error("Request error:", error)
        return Promise.reject(error)
    }
)

footballDataClient.interceptors.response.use(
    (response) => {
        console.log(
            `Received response from: ${response.config.baseURL}${response.config.url}`
        )
        console.log(`Response status: ${response.status}`)
        return response
    },
    (error) => {
        if (error.response) {
            console.error(
                `API request failed with status ${error.response.status}: ${error.response.data}`
            )
            if (error.response.status === 429) {
                console.error("Rate limit exceeded. Please try again later.")
            } else if (error.response.status === 404) {
                console.error(
                    "Resource not found. Check the URL or parameters."
                )
            } else if (error.response.status >= 500) {
                console.error("Server error. Please try again later.")
            }
        } else {
            console.error("API request failed:", error.message)
        }
        return Promise.reject(error)
    }
)

export const footabllDataRequest = async (
    endpoint: string,
    params?: Record<string, string | number>
) => {
    try {
        const response = await footballDataClient.get(endpoint, { params })
        return response.data
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error("Axios error:", error.message)
            throw new Error(
                `Failed to fetch data from endpoint: ${endpoint}. Error: ${error.message}`
            )
        }
        console.error("Unexpected error:", error)
        throw new Error(
            "An unexpected error occurred for endpoint: " + endpoint
        )
    }
}

