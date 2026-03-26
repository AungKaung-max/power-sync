import { CheckCircle2 } from 'lucide-react'


const About = () => {
    return (
        <div className="p-5 space-y-2">
            <h1 className="text-2xl font-bold font-display">PowerSync?</h1>

            <div className="space-y-8">
                <div className="bg-gradient-to-br from-emerald-50/50 to-amber-50/50 p-8 rounded-[2.5rem] border border-white">
                    <p className="text-text-main text-base leading-relaxed font-medium">
                        PowerSync is redefining the energy landscape. We provide a seamless, beautiful interface for the modern energy consumer.
                    </p>
                </div>

            </div>


            <div className="space-y-8">
                <h3 className="font-bold text-lg px-1">The Problem</h3>
                <div className="bg-gradient-to-br from-emerald-50/50 to-amber-50/50 p-8 rounded-[2.5rem] border border-white">
                    <p className="text-text-main text-base leading-relaxed font-medium">
                        With frequent power cuts, students and remote workers often struggle to find reliable places to charge devices or access stable Wi-Fi to continue their education and work uninterrupted.
                    </p>
                </div>
            </div>

            <div className="space-y-6">
                <h3 className="font-bold text-lg px-1">Our Solution</h3>
                <p className="text-text-main text-sm leading-relaxed font-medium px-1">
                    A map-based finder for "KBZPay-Verified" cafes and study centers equipped
                    with generator or solar power backup.
                </p>
                {[
                    { title: 'Find Nearby Locations', desc: 'Find nearby powered locations instantly.' },
                    { title: 'Check-in & Pay', desc: '"Check-in" and pay for usage by the hour.'},
                    { title: 'KBZPay Integration', desc: 'Seamless KBZPay integration for checkout.'},
                    
                ].map((item, i) => (
                    <div key={i} className="flex gap-5 items-start">
                        <div className="w-12 h-12 bg-white shadow-sm rounded-2xl flex items-center justify-center shrink-0 border border-slate-50">
                            <CheckCircle2 size={24} className="text-primary" />
                        </div>
                        <div className="space-y-1">
                            <h4 className="font-bold text-base">{item.title}</h4>
                            <p className="text-text-muted text-xs font-medium leading-normal">{item.desc}</p>
                        </div>
                    </div>
                ))}
            </div>


        </div>
    )
}


export default About;