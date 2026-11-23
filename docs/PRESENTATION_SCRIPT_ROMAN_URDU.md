# Presentation Script (Roman Urdu)

Har slide ke saath ye bolein. Poora 8 se 10 minute ka hai.

## Slide 1: Cover
Assalam-o-Alaikum. Hamara project "DUET Admission Assistant" hai. Ye ek AI web chatbot hai jo Dawood University ke admission ke sawalon ke jawab deta hai. Hum Syed Taha Fatmi aur Kaifullah Khan hain, Web Technologies course, Miss Maryam ke liye.

## Slide 2: Problem
Admission ki maloomat alag alag jagah bikhri hui hoti hai: programs, minimum marks, fees aur dates. Admissions office ko har saal wahi sawal baar baar sambhalne parte hain. Students raat ko ya phone par, English ya Roman Urdu mein poochna chahte hain. Hamara goal ek 24/7 assistant banana tha jo pehle DUET ki apni maloomat se jawab de aur dates ya fees ke liye official portal ki taraf bheje.

## Slide 3: Solution
Hamari website par sab kuch ek jagah hai. Chat assistant jo English aur Roman Urdu samajhta hai, CPN estimator jo merit score nikalta hai, programs explorer jahan card par "Ask about this" dabane se sawal chatbot ko chala jata hai, aur process, FAQ aur campus section. Right side par asli website ka screenshot hai.

## Slide 4: Kaise jawab deta hai
Pehle student sawal likhta hai. Phir safety check hota hai: agar koi OTP, password ya card ki baat kare to bot mana kar deta hai. Phir hamara apna knowledge base dekha jata hai, jis mein 15 admission topics hain. Agar wahan pakka jawab mil jaye to wahi diya jata hai. Sirf jab jawab na mile, tab Google Gemini AI se poochha jata hai. Har jawab ke neeche label hota hai ke ye knowledge base se hai ya AI se. Agar Gemini na chale to fallback message aata hai, bot band nahi hota. Ye design is liye hai ke AI galat dates ya fees na bana de.

## Slide 5: Technologies
Frontend React aur Vite mein hai, styling Tailwind CSS se, aur animations Motion library se. Backend Node.js aur Express mein hai, jis ke teen endpoints hain: chat, config aur health. AI ke liye Google Gemini API aur hamara JSON knowledge base. Code GitHub par hai aur Render par live deploy hai. Tests node:test se likhe hain, 18 tests.

## Slide 6: Admission rules
Hum ne rules chatbot aur estimator dono mein daale hain. 2nd year Intermediate mein minimum 60 percent BE ke liye aur 50 percent BS ke liye chahiye. Ye sirf eligibility hai. Merit CPN se banti hai: 10 percent Matric, 30 percent Intermediate aur 60 percent Entry Test. Ye weights published admission guides se hain, is liye hum kehte hain ke official formula portal par confirm karein.

## Slide 7: User experience
Ye hamare UI ke do screenshots hain. Programs ke cards mein BE, B.Arch aur BS ke filters hain. CPN estimator mein sliders hain, gauge animate hota hai, aur agar Intermediate minimum se kam ho to batata hai kitna kam hai. Website light aur dark mode dono mein chalti hai aur phone par bhi theek dikhti hai.

## Slide 8: Quality aur security
18 automated tests pass hain, npm audit mein koi vulnerability nahi, aur 23 manual, API aur Gemini checks kiye. Security ke liye helmet headers, chat par 20 requests per minute ki limit, size limits, aur API key sirf server par rehti hai, browser ko nahi milti. Live site par rate limit bhi test kiya: 20 ke baad 429 error aata hai.

## Slide 9: Limitations aur future
Hum honestly kehte hain: keyword search anokhe alfaaz miss kar sakta hai, kuch fees aur quota ki maloomat third-party guides se hain, aur free hosting idle hone par so jati hai. Aage hum semantic search, Urdu script aur voice, admin dashboard, aur admissions office se official data jorna chahte hain.

## Slide 10: Thank you
Shukriya. Live demo link aur GitHub link slide par hain. Ab aap koi sawal pooch sakte hain, ya hum live demo dikha sakte hain.

---

## Live demo ke liye (2 minute)
1. Chat mein poochhein: "What is the minimum percentage required?" (knowledge base se jawab, label dikhega).
2. "Mera matric ka result purana hai, kya apply kar sakta hoon?" (Roman Urdu).
3. Koi anokha sawal: "Is there a hostel for girls?" ya "DUET or NED which is better?" (Gemini ka jawab).
4. CPN estimator mein Intermediate 55 karke BE aur BS dabayein.
5. Mobile view dikhayein.

## Possible sawal aur jawab
- **AI kahan use hua?** Gemini sirf tab, jab knowledge base ke paas jawab na ho. Pehle apna jawab, taake galat maloomat na aaye.
- **API key kahan hai?** Render ke environment variables mein, GitHub ya browser mein nahi.
- **Fees aur dates sahi hain?** Kuch third-party guides se hain, is liye bot hamesha official portal confirm karne ko kehta hai.
- **Agar internet ya Gemini na chale?** Fallback message aur knowledge base ke jawab chalte rahte hain.
- **Rate limit kyun?** Koi bar bar request bhej kar Gemini ka free quota khatam na kar de.
