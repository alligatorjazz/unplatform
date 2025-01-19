type WebringMember = {
	url: string;
	title: string;
	timestamp: string | Date;
	email?: string;
}

type Webring = WebringMember[];

export const webring: Webring = [
	{
		url: "https://fromthesuperhighway.com",
		title: "From The Superhighway",
		timestamp: new Date("2024-09-19")
	},
	{
		url: "https://ajazz.neocities.org",
		title: "ajazz",
		timestamp: new Date("2024-09-19")
	},
	{
		url: "https://downtheladder.net",
		title: "Down The Ladder",
		timestamp: new Date("2024-09-19")
	},
	{
		url: "https://www.goblinmarketfl.com/",
		title: "Goblin Market",
		timestamp: new Date("2024-10-24"),
		email: "ring.courtney14@gmail.com"
	},
	{
		url: "https://astrologyclock.net/",
		title: "Astrology Clock",
		timestamp: new Date("2024-12-04"),
		email: "maymiami20@gmail.com"
	},
]