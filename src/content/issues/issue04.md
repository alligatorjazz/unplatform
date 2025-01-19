---
title: A Very Bitsy Christmas
publishDate: 2024-12-27
description: Virtual pets, explorable images, and a big dive into tiny games (and a tiny engine!)
tags:
  - issues
poster: https://falchion-fleet-public.us-southeast-1.linodeobjects.com/fts/issue04/issue04cover.png
---
Hello and welcome to the fourth issue of **>: FROM THE SUPERHIGHWAY**! In this issue, we've got a suite of interactive projects from across the indie web to share with you - including another project from our old friend [Melonking](https://melonking.net/), a cool new way to explore 2D images, and a featured interview with prolific itch.io creator Max Bradbury. Let's get started!

## >: raise your own (gify)pet!
In the [first issue](https://fromthesuperhighway.com/issues/issue01), I confidently asserted that you could spend "days" exploring the site of web artist and former interview subject [Melonking](https://melonking.net/), and I was not exaggerating. His portfolio is truly immense, and could easily have furnished all the recommendations for the last three issues on its own - but instead, I've decided to fold some of his bespoke side projects into issues where they are most relevant. Today, we're taking a look at Melonking's [Gifypet](https://gifypet.neocities.org/) - an interactive webapp that allows you to embed a Tamogachi-esque virtual pet onto any webpage.

Gifypet is really astonishingly feature rich for how small it is - both in terms of screen space and file size - and if you spend a lot of time browsing the indie web, it's not unlikely that you've seen one out in the wild. Your pet (and its environment) can be literally any .png image you want, and I've seen Gifypets that look like everything from Shadow The Hedgehog to Lily Valley (the latter of which can be seen on the official website). I've linked to the Gifypet site above if you want to learn more, and, of course, I've embedded the "official" FTS Gifypet below so he can stand watch over this issue for all eternity. (Folks reading from RSS or the email newsletter might need to pull up this issue in the full site to see it - sorry!)

<iframe style="margin: auto;" width="314" height="321" scrolling="no" src="https://gifypet.neocities.org/pet/pet.html?name=gatorman&dob=1735309342&gender=m&element=Water&pet=https%3A%2F%2Fajazz.neocities.org%2F_astro%2Fgator-guy.DDkJDq7o_ZCrzUg.webp&map=ozwomp.jpg&background=wood.jpg&tablecolor=%23ffffff&textcolor=white" frameborder="0"></iframe>

---

## >: prancing in the vertex meadow

Techniques to view 2D images as 3D spaces have existed for a while now, but usually exclusively rely on some kind of machine technology to automatically generate the landscape. In contrast, enter [Vertex Meadow](https://www.vertexmeadow.xyz/): a web app that lets you transform 2D images into 3D spaces, and then lets *you* paint 3D details onto them.

It's honestly surprising how quickly any given image can be instantly transformed into an unnerving dreamlike landscape - and the surprisingly powerful editor gives you a suite of tools to fill in those landscapes as you see fit. On top of that, your creations are easily sharable; a one-button export process gives you a zip file that you can then host anywhere you want, including on itch.io or your personal website. The homepage has many such examples of shared creations - some cozy, some creepy, but all of them are at the very least interesting. I encourage you to give it a shot - and if you happen to create something cool, send it my way at [submissions@fromthesuperhighway.com](mailto:submissions@fromthesuperhighway.com).

## >: an itsy bitsy game engine

Game development has never been easier or more accessible than it is today. Even the golden age of flash games during my childhood in the late 2000s doesn't hold a candle to the cornucopia of options available today on sites like [itch.io](https://itch.io/). A lot of this growth is driven by the  increased popularity of gaming as a medium, but a lot of it is also driven by the creation of game development tools intended specifically for artists, writers, and musicians, instead of programmers. One such tool is [Bitsy](https://bitsy.org/) - a minimal game engine for "little games, worlds, and stories."

Bitsy is one of the simplest game engines I've ever seen - by default, games are composed of tiny little 16x16 tile rooms, and almost all game interactions are conducted through a standardized dialog prompt. In spite of this simplicity (or perhaps because of it), Bitsy cultivated a fairly dedicated community that created many [development tools](https://itch.io/blog/515981/bitsy-museum-hack-20), and [educational resources](https://rahji.github.io/bitsy-handout/web/) to expand the engine's reach and capability.

You might be wondering where you could find a neatly organized collection of Bitsy games to try out - if so, I've got some great news for you in the next section.

## >: this month's feature: an interview with max bradbury

I didn't stumble upon Bitsy on its own - I actually found it while diving through the work of [Max Bradbury](https://tinybird.info), a software developer, musician, and writer who created almost a dozen games and tools for the Bitsy ecosystem over the last seven years. I've long wanted to feature more itch.io creators on the site, and Bradbury's [body of work](https://ruin.itch.io/) - composed of evocative, byte-sized vignettes that can be completed in 5 to 10 minutes - was a perfect fit. Last week, I had the pleasure of chatting with them about Bitsy, its community, and their journey through game development.

### ?:  In the past, [you've](https://tinybird.neocities.org/bitsy-futures) [discussed](https://tinybird.neocities.org/bitsy-futures) how you got interested in Bitsy specifically - but how much game development experience did you have before then, if any?
  
**max:** When I was a kid I loved making games in Klik 'n' Play and The Games Factory. Our school computers had some sort of Hypercard-type program and I used to make weird little adventure games in that as well. I'm still hugely inspired by easy-to-use creative computing tools like these, as well as Kid Pix and Flying Colours and so on. I really hope that someday I can create something with that same spirit.  
  
In my teens, I messed around with DarkBASIC but without any programming experience, I found it difficult and gave up quite quickly. I think generally the jump from very simple/limited/accessible tools to Actual Programming can be very painful and disheartening to people. I'm not really sure what the solution to that is. When I was 12 I got a Lego Mindstorms set which had a little robot you could program with a visual code editor (i.e. drag and drop "if" blocks , "for" blocks and so on) - maybe something like that, but that exposes what the "actual code" looks like at the same time to make it less scary?

After working as a web developer for a few years, I was unemployed briefly and returned to games programming as a fun project to keep my skills sharp. I started work on a cyberpunk RPG, but even with what seemed like a fairly limited scope (low-res static images, limited interactions, very basic combat) I got completely overwhelmed by the mountain of work that would be needed to finish it - background graphics and music for every scene, sprites for every item and enemy, and lots and lots of writing. Making a violent game didn't really sit well with me either and so I stopped work on it. I don't see this as a failure - it's good to know when to quit.

A year later, I made a puzzle game called Endless Mines (a mashup of Minesweeper and Tetris) in a weekend, then spent a month polishing it before putting it online. Actually releasing something felt great and I feel like I learnt more in that process than I had in all my previous game development combined. When I discovered Bitsy, with its even more drastically limited scope by design, I had quite a streak of releasing lots of little games, and it was wonderful being part of a likeminded community - we all played each other's games and gave lots of support and constructive criticism.

For anyone trying to start out, my advice is: reduce scope, then reduce scope again, then reduce scope again. Participate in jams so you'll be forced to stick to a limited time frame, and find/form a community to help each other out and to keep your motivation up.

### ?: What direction do you see the Bitsy community moving towards in the coming years? Is there interest in continuing to expand the scope of what's possible with the engine and its ecosystem, or are folks mostly trying to stick to the basics?

**max:** The Bitsy community as I knew it has essentially moved on. It mostly revolved around an unofficial Discord community that no longer exists. However, many of us are still friends, still collaborate and participate in game jams and so on. Several members have created their own game dev tools (bipsi by candle, videotome by freya, mosi by sg, etc.)

- [https://candle.itch.io/bipsi](https://candle.itch.io/bipsi)
- [https://communistsister.itch.io/videotome](https://communistsister.itch.io/videotome)
- [https://zenzoa.itch.io/mosi](https://zenzoa.itch.io/mosi)

I'm out of the loop but I'd quite like to take a look at what people are making with Bitsy now. In its heyday there was kind of a demoscene mentality where everyone was trying to one-up each other with novel and ridiculous hacks. I imagine things are a bit more tame now, but I bet people are still doing new and cool things with it.

### ?: If you were showing someone Bitsy for the first time, and you could only show them three projects made by other creators, which ones would you choose?
- [https://haraiva.itch.io/novena](https://haraiva.itch.io/novena) - poetic and beautiful.
- [https://magmasubterraneo.itch.io/vertigo](https://magmasubterraneo.itch.io/vertigo) - really pretty, very personal and I love a bit of magical realism.
- [https://rosekiid.itch.io/there-arent-really-words](https://rosekiid.itch.io/there-arent-really-words) - this one does a really good job of conveying intense emotion through gameplay and visuals.

### ?: I discovered you through the [Low Tech Webring](https://emreed.net/LowTech_Directory) - what specifically inspired you to join it? How do you implement "low-tech" philosophies into your art, work, or digital life?

**max:** [Em Reed](https://emreed.net/) is a friend of mine, and like many of our friends I enjoy [Low Tech Magazine](https://solar.lowtechmagazine.com/) and writing of that ilk, so it felt like a natural thing to do. I especially like the environmental and privacy aspects of low-tech stuff, like reducing e-waste and avoiding adtech surveillance. 

Webrings are a bit silly but it's also just a lot of fun to click around one and visit different people's sites - it makes the web feel more like a physical space, like walking around a neighbourhood and being welcomed into people's homes. Neocities is really good for this as well.

I like keeping older computers running (all of mine are 12+ years old!) not just because it's satisfying and thrifty, but as an intentional practice. I think too many developers are using absurdly powerful computers with 4K displays and fibre broadband and are creating software, websites and games that simply grind to a halt on the sort of basic hardware that many people are actually using. If I make something and it runs well on my computer then I feel pretty confident that it'll run well for most computer users.

I also try to remember that not everyone has a computer, a phone and so on, even though my work as a web developer is at odds with that. But at least I can speak up if someone's idea of a solution to a social problem is to "just make an app" or something.
  
### ?: I see you have a Fediverse (Mastodon) account - what's your current take on how the Fediverse community has developed in the last few years? Are there promising signs? Worrying trends?

**max:** I'm happy on the fediverse and I like the smaller, cosier feel of it. I think this is where I'll be hanging out online for many years to come. As much as I enjoyed twitter back in the day, it also made me and many others deeply unhappy or angry at times. There are too many dark patterns baked into it - an addictive, constantly updating feed and lots of distracting notifications. I found myself tweeting and replying flippantly, chasing a quick hit of validation from faves and retweets but failing to consider the humanity of people on the other side of the screen. But the fediverse hasn't solved these problems either - I think they're mostly just mitigated by the smaller scale of things. It's a bit scary when I see people clamouring to replicate the harmful decisions that Twitter made, like quote-retweets which were really just a tool for dogpiling and for giving hateful opinions a bigger platform.

I see a lot of people moving to Bluesky at the moment, but Twitter was toxic the first time around and I don't see why another centralised, for-profit Jack Dorsey social media platform would be any better.

As much as I sneer at these big tech platforms that explicitly welcome bigots, I also have to remind myself that racism and bigotry are a problem on the fediverse too, even if the culture is seemingly more progressive. Moderation really varies and while some mods are great, many are fairly hands-off, and the open nature of the protocol does mean that bad actors can start their own instances at any time. The small scale of fedi servers could mean that abuse could go unmoderated for eight hours while your instance's lone unpaid moderator is asleep, or ill or at work. I'd like to see more of a culture of mutual aid, where people chip in toward server costs, share the workload of moderation and so on, instead of a lot of unsustainable fiefdoms.

### ?: What do you think the next ten years have in store for the web?

**max:** Sadly, I'm not very optimistic. I think browsers will continue to grow in scope and will keep getting more hostile towards their users. I think Firefox will probably cease to exist at some point, and I'm not sure what browser I will switch to then. It's not the web exactly but I enjoy browsing Gemini, which is an intentionally very limited smallweb protocol. It's a good reminder of what's actually important to the web: words and thoughts.

The web will continue to get polluted with generative machine-learning crap, but it's currently highly subsidised and maybe once the venture capital bubble bursts it'll become infeasible for people to use AI once they actually have to pay for it. I do worry that the web as we know it will eventually just become a completely untrustworthy pool of content slurry.

That said, I can see the small web / indie web getting bigger in the years to come. And I don't think it's just due to people like me who remember the wild, optimistic early days of the web - I see plenty of young people having fun with it and it's really heartening to see. Big platforms will come and go but we can ignore them and keep carving out a niche for ourselves.

## >: endnotes and further reading!
- Last year, I released an extremely early proof-of-concept for a website builder called [Tribune](https://tribune.neocities.org/) - I'm looking to give it a makeover for the new year, and hopefully turn it into a genuinely useful tool for newcomers to the indie web. I'm actively looking for beta testers - if a (relatively) easy, non-corporate website builder sounds like something you'd be interested in trying out, shoot me an email at [ajazz@fromthesuperhighway.com](mailto:ajazz@fromthesuperhighway.com)!
- Say hello to the newest member of the FTS [webring](https://www.patreon.com/c/FalchionStudios), [May Márquez's](https://www.maymarquez.com/) [Astrology Clock](https://astrologyclock.net/)! It's a  minimal and configurable clock that shows the time, moon phase, and a variety of zodiac-relevant information about the planets. If you'd like to join the webring too, pay a visit to the [Falchion Studios](https://patreon.com/FalchionStudios) Patreon!
- We're always looking for submissions! If you want to submit cool finds for a future issue, send them to [submissions@fromthesuperhighway.com](mailto:submissions@fromthesuperhighway.com)!
