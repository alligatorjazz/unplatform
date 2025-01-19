import { notOk, ok, type AsyncResult } from "simple-result";

const apiUrl = import.meta.env["PUBLIC_API"] ?? "https://api.fromthesuperhighway.com";

export async function newsletterSignup(email: string): AsyncResult<{ message: string }, { message: string }> {
	const response = await fetch(
		new URL("/newsletter/signup", apiUrl),
		{ method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email }) }
	)

	if (!response.ok) {
		console.error(response);
		if (response.status === 400) {
			return notOk({ message: "It seems like your email is incorrectly formatted - double-check you've spelled it right and then refresh and try again." })
		}

		if (response.status === 409) {
			return notOk({ message: "It seems like you already signed up! Check for a confirmation email in your inbox - if that doesn't work, shoot an email to support@falchionstudios.com." })
		}

		return notOk({ message: "Whoops - there was an error on our end. Refresh and try again - if that doesn't work, shoot an email to support@falchionstudios.com." })

	}

	return ok({ message: "Thanks for signing up! Check your inbox in the next minute or so for a confirmation email." })
}

export async function newsletterConfirm(code: string) {
	const response = await fetch(
		new URL("/newsletter/confirm", apiUrl),
		{ method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ code }) }
	)

	if (!response.ok) {
		console.error(await response.text());
		if (response.status === 400 || response.status === 404) {
			return notOk({ message: "It seems like maybe your confirmation email has expired or you clicked a wrong link - try signing up for the newsletter again." })
		}

		return notOk({ message: "Whoops - there was an error on our end. Refresh the page and try again - if that doesn't work, shoot an email to support@falchionstudios.com." })
	}

	return ok({ message: "You're confirmed! You'll recieve all future updates via email. Sending you to the latest issue..." })
}