import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, FileText, Plus, Minus, ArrowRight } from 'lucide-react';
import axios from 'axios';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Admin Components
import AdminLogin from './components/Admin/AdminLogin';
import AdminDashboard from './components/Admin/AdminDashboard';



const Logo = ({ className = "", dark = false }) => (
    <div className={`flex items-center leading-tight ${className}`}>
        <div className="relative flex items-center text-[#6D28D9]">
            <span className="text-4xl font-extrabold" style={{ fontFamily: 'sans-serif' }}>P</span>
            <div className="absolute left-[0.8rem] bottom-[0.4rem] flex flex-col space-y-[2px]">
                <div className="w-3 h-[3px] bg-[#6D28D9]"></div>
                <div className="w-3 h-[3px] bg-[#6D28D9]"></div>
            </div>
        </div>
        <div className={`text-2xl font-bold ml-2 ${dark ? 'text-white' : 'text-[#6D28D9]'}`}>
            ProfileEra
        </div>
    </div>
);

// --- Components ---

const Navbar = () => (
    <nav className="fixed top-0 left-0 right-0 flex items-center px-12 py-6 bg-[#F5EEFF]/95 z-50 backdrop-blur-md border-b border-purple-100 shadow-sm">
        <div className="w-1/4">
            <a href="#home" className="hover:opacity-80 transition-opacity">
                <Logo className="scale-100 origin-left" />
            </a>
        </div>
        <div className="hidden lg:flex flex-1 justify-center space-x-10 text-gray-700 font-bold text-sm tracking-tight">
            <a href="#home" className="text-[#6D28D9] border-b-2 border-[#6D28D9] pb-1">Home</a>
            <a href="#who" className="hover:text-purple-600 transition">Who this is for?</a>
            <a href="#services" className="hover:text-purple-600 transition">Our services</a>
            <a href="#contact" className="hover:text-purple-600 transition">Contact us</a>
            <a href="#pricing" className="hover:text-purple-600 transition">Pricing</a>
            <a href="#trust" className="hover:text-purple-600 transition">Trust</a>
        </div>
        <div className="hidden lg:block w-1/4"></div>
    </nav>
);

const SectionBranding = ({ title }) => (
    <div className="flex flex-col items-center mb-8">
        <span className="text-[#6D28D9] font-black text-xs uppercase tracking-[0.4em] mb-4">ProfileEra</span>
        <h2 className="text-4xl md:text-5xl font-extrabold uppercase tracking-wider text-gray-900">{title}</h2>
    </div>
);

const Hero = () => {
    return (
        <section id="home" className="pt-40 pb-32 px-4 bg-white relative">
            <div className="max-w-7xl mx-auto relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-16 flex flex-col items-center"
                >
                    <span className="text-[#6D28D9] font-black text-xs uppercase tracking-[0.4em] mb-4">ProfileEra</span>
                    <h1 className="text-7xl md:text-8xl font-black text-[#6D28D9] mb-4 tracking-tighter">ProfileEra</h1>
                    <p className="text-xl md:text-2xl font-bold text-gray-800 mb-2">Career Acceleration & Interview Access Platform</p>
                </motion.div>

                <div className="flex flex-col lg:flex-row items-center justify-center gap-20">
                    {/* Image Section with Blob */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1, delay: 0.2 }}
                        className="relative flex-1 w-full max-w-2xl"
                    >
                        <div className="absolute inset-0 bg-gray-100 rounded-[30%_70%_70%_30%_/_30%_30%_70%_70%] filter blur-2xl opacity-50 scale-110 -rotate-12 translate-y-10"></div>
                        <img
                            src="/hero_illustration.png"
                            alt="Hero Illustration"
                            className="relative z-10 w-full h-auto drop-shadow-2xl"
                        />
                    </motion.div>

                    {/* Text Section */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="flex-1 text-center lg:text-left"
                    >
                        <h2 className="text-6xl md:text-8xl font-black text-gray-900 leading-[1.1] tracking-tight">
                            Get More <br className="hidden md:block" /> Interviews.
                        </h2>
                        <p className="text-3xl md:text-4xl font-bold text-[#7C3AED] mt-6">
                            Without Quitting Your Job
                        </p>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

const WhoIsThisFor = () => {
    return (
        <section id="who" className="py-24 bg-white border-t border-gray-100">
            <div className="max-w-6xl mx-auto px-6 md:px-10 text-center">
                <SectionBranding title="WHO THIS IS FOR?" />

                <div className="relative">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="space-y-12"
                        >
                            {/* For You */}
                            <div className="text-left">
                                <h3 className="text-2xl font-bold mb-6 text-[#6D28D9]">This is for YOU if:</h3>
                                <ul className="space-y-4">
                                    {[
                                        "You are fresher OR experienced and serious about getting interviews",
                                        "You are tired of applying daily with no responses",
                                        "You understand interviews are earned, not sold",
                                        "You are willing to prepare and perform"
                                    ].map((item, i) => (
                                        <motion.li
                                            key={i}
                                            initial={{ opacity: 0, x: -10 }}
                                            whileInView={{ opacity: 1, x: 0 }}
                                            viewport={{ once: true }}
                                            transition={{ delay: i * 0.1 }}
                                            className="flex items-start"
                                        >
                                            <span className="mr-3 text-[#6D28D9] font-bold">•</span>
                                            <span className="text-gray-700 font-medium">{item}</span>
                                        </motion.li>
                                    ))}
                                </ul>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="space-y-12"
                        >
                            {/* Not For You */}
                            <div className="text-left opacity-70">
                                <h3 className="text-2xl font-bold mb-6 text-gray-400">This is NOT for:</h3>
                                <ul className="space-y-4">
                                    {[
                                        "People looking for fake experience or proxy",
                                        "People unwilling to face interviews themselves",
                                        "People who think money alone replaces competence"
                                    ].map((item, i) => (
                                        <motion.li
                                            key={i}
                                            initial={{ opacity: 0, x: 10 }}
                                            whileInView={{ opacity: 1, x: 0 }}
                                            viewport={{ once: true }}
                                            transition={{ delay: i * 0.1 }}
                                            className="flex items-start"
                                        >
                                            <span className="mr-3 text-gray-400 font-bold">•</span>
                                            <span className="text-gray-500 font-medium">{item}</span>
                                        </motion.li>
                                    ))}
                                </ul>
                            </div>
                        </motion.div>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="mt-12 flex justify-center"
                    >
                        <img src="/who_is_this_for.png" alt="Who this is for" className="w-full max-w-2xl h-auto" />
                    </motion.div>
                </div>

                <div className="mt-12 text-center text-gray-400 italic font-medium">
                    We work with serious candidates only.<br />
                    If you want shortcuts, this is not for you.
                </div>
            </div>
        </section>
    );
};

const Services = () => {
    const serviceData = [
        {
            title: "Resume Rewriting",
            subtitle: "(ATS + Recruiter Optimized)",
            features: ["Role-aligned content", "Keyword mapping", "7-second recruiter readability"],
            icon: <FileText className="text-[#6D28D9]" />,
            desc: "Expertly crafted resumes designed to beat ATS and catch the recruiter's eye in 7 seconds."
        },
        {
            title: "Profile Optimization",
            icon: <Search className="text-[#6D28D9]" />,
            desc: "SEO-driven LinkedIn and Naukri profile enhancements to rank you higher in recruiter searches."
        },
        {
            title: "Profile Marketing",
            icon: <Plus className="text-[#6D28D9]" />,
            desc: "Strategic distribution and networking to put your profile in front of decision makers."
        },
        {
            title: "Interview Access Support",
            icon: <Plus className="text-[#6D28D9]" />,
            desc: "Coaching and strategic outreach to secure interview slots for your target roles."
        }
    ];

    return (
        <section id="services" className="py-24 bg-gray-50 border-t border-gray-100">
            <div className="max-w-6xl mx-auto px-6 md:px-10">
                <SectionBranding title="WHAT WE ACTUALLY DO" />
                <div className="grid md:grid-cols-2 gap-8">
                    {serviceData.map((service, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="p-10 rounded-[2.5rem] border-2 border-purple-100 bg-[#FAF5FF] hover:bg-white hover:shadow-2xl hover:border-purple-300 transition-all duration-300 transform hover:-translate-y-2 group"
                        >
                            <div className="w-16 h-16 bg-[#6D28D9] rounded-2xl flex items-center justify-center mb-8 shadow-lg group-hover:rotate-6 transition-transform">
                                {service.icon}
                            </div>
                            <h3 className="text-2xl md:text-3xl font-bold mb-2 text-gray-900">{service.title}</h3>
                            <p className="text-gray-700 font-medium text-lg leading-tight">{service.desc}</p>
                        </motion.div>
                    ))}
                </div>
                <div className="mt-12 text-center text-gray-500 font-medium">
                    NOTE: We get you interviews. You crack them. No impersonation. No shortcuts.
                </div>
            </div>
        </section>
    );
};

const ProblemAccordion = () => {
    const [openIndex, setOpenIndex] = useState(0);
    const problems = [
        { title: "ATS Rejection", content: "Your resume never reaches a human. We optimize for the 7-second recruiter rule." },
        { title: "Poor Positioning", content: "Recruiters can't understand your value quickly enough. We make it obvious." },
        { title: "Wrong Visibility", content: "Applying randomly doesn't equal being seen by the right people. Strategic positioning is key." },
        { title: "No Strategic Outreach", content: "We focus on intelligent response rates, not desperate mass applying." }
    ];

    return (
        <section className="py-24 px-6 md:px-10 bg-white border-t border-gray-100">
            <SectionBranding title="THE REAL PROBLEM" />
            <p className="text-center text-gray-700 font-bold mb-12 text-xl">Why Most Candidates Never Get Calls?</p>

            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-12"
            >
                <div className="flex-1 flex flex-col items-center">
                    <motion.img
                        whileHover={{ scale: 1.05 }}
                        src="/real_problem.png"
                        alt="Real Problem"
                        className="w-full max-w-sm h-auto mb-8 transition-transform"
                    />
                    <div className="bg-white p-4 rounded-xl shadow-lg border border-purple-100 font-bold text-[#6D28D9] uppercase tracking-widest text-lg">
                        JOB INTERVIEW
                    </div>
                </div>
                <div className="flex-1 w-full space-y-2">
                    {problems.map((p, i) => (
                        <div key={i} className="border-b border-purple-100">
                            <button
                                onClick={() => setOpenIndex(openIndex === i ? -1 : i)}
                                className="w-full flex items-center justify-between p-6 group transition-colors text-left"
                            >
                                <span className={`text-xl font-bold ${openIndex === i ? 'text-[#6D28D9]' : 'text-gray-800'} group-hover:text-[#6D28D9]`}>
                                    {p.title}
                                </span>
                                <div className="bg-gray-100 p-1 rounded-sm">
                                    {openIndex === i ? <Minus className="text-[#6D28D9]" size={20} /> : <Plus className="text-gray-400" size={20} />}
                                </div>
                            </button>
                            <AnimatePresence>
                                {openIndex === i && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: 'auto', opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        className="overflow-hidden"
                                    >
                                        <p className="px-6 pb-6 text-gray-600 font-medium">
                                            {p.content}
                                        </p>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    ))}
                </div>
            </motion.div>
        </section>
    );
};

const AccordionItem = ({ title, content }) => {
    const [open, setOpen] = useState(false);
    return (
        <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition duration-300">
            <button onClick={() => setOpen(!open)} className="w-full flex justify-between items-center p-6 md:p-8 text-left">
                <span className={`text-xl md:text-2xl font-bold ${open ? 'text-[#6D28D9]' : 'text-gray-800'}`}>{title}</span>
                <div className={`p-2 rounded-full ${open ? 'bg-[#F3E8FF] text-[#6D28D9]' : 'bg-gray-100 text-gray-500'}`}>
                    {open ? <Minus size={24} /> : <Plus size={24} />}
                </div>
            </button>
            <AnimatePresence>
                {open && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                    >
                        <div className="p-8 pt-0 text-gray-600 text-lg leading-relaxed bg-white">
                            {content}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

const Pricing = () => {
    const packages = [
        {
            name: "Launch",
            subtitle: "Freshers / Interns",
            price: "₹10,000",
            color: "green",
            who: ["Final-year students", "Fresh graduates", "Intern-to-job transition"],
            includes: ["Resume structuring (ATS-friendly)", "LinkedIn profile optimization", "Role clarity & keyword alignment", "Guided job application strategy"],
            note: "Interview opportunities depend on profile readiness and market demand."
        },
        {
            name: "Professional",
            subtitle: "2–4 Years Experience",
            price: "₹25,000",
            color: "blue",
            who: ["Working professionals with 2–4 years experience", "Looking to switch roles or companies"],
            includes: ["Resume rewriting (role-specific)", "LinkedIn + job portal optimization", "Profile positioning for target roles", "Profile marketing & recruiter outreach", "Interview opportunity tracking"]
        },
        {
            name: "Advanced",
            subtitle: "4+ Years Experience",
            price: "₹35,000",
            color: "red",
            who: ["Mid-level professionals", "Stagnant growth or compensation", "Targeting senior or specialized roles"],
            includes: ["Senior-level resume positioning", "Advanced keyword & ATS optimization", "Targeted profile marketing strategy", "Recruiter engagement & follow-ups", "Interview access coordination"]
        }
    ];

    return (
        <section id="pricing" className="py-24 bg-white border-t border-gray-100">
            <div className="max-w-7xl mx-auto px-6 md:px-10">
                <SectionBranding title="PRICING PACKAGES" />

                <div className="grid lg:grid-cols-3 gap-8 mt-12">
                    {packages.map((pkg, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="flex flex-col border-2 border-purple-100 rounded-[2.5rem] p-8 bg-white hover:shadow-2xl transition duration-300 relative overflow-hidden"
                        >
                            <div className={`absolute top-0 right-0 w-24 h-24 -mr-8 -mt-8 opacity-10 rounded-full bg-${pkg.color}-500`}></div>
                            <div className="mb-8">
                                <h3 className="text-3xl font-black text-gray-900 mb-1">{pkg.name}</h3>
                                <p className="text-sm font-bold text-gray-500 uppercase tracking-widest">{pkg.subtitle}</p>
                            </div>

                            <div className={`bg-purple-50 inline-block px-6 py-3 rounded-2xl text-3xl font-black text-[#6D28D9] mb-8 w-fit`}>
                                {pkg.price}
                            </div>

                            <div className="mb-8">
                                <h4 className="font-bold text-gray-900 mb-3 text-sm uppercase tracking-wider">Who this is for:</h4>
                                <ul className="space-y-2">
                                    {pkg.who.map((item, idx) => (
                                        <li key={idx} className="flex items-start text-sm text-gray-600 font-medium">
                                            <span className="text-[#6D28D9] mr-2">•</span>
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className="mb-8 flex-grow">
                                <h4 className="font-bold text-gray-900 mb-3 text-sm uppercase tracking-wider">Includes:</h4>
                                <ul className="space-y-2">
                                    {pkg.includes.map((item, idx) => (
                                        <li key={idx} className="flex items-start text-sm text-gray-700 font-medium">
                                            <div className="w-1.5 h-1.5 bg-[#6D28D9] rounded-full mt-1.5 mr-3 flex-shrink-0"></div>
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {pkg.note && (
                                <div className="mt-8 p-4 bg-gray-50 rounded-xl border border-gray-100">
                                    <p className="text-xs text-gray-500 italic">
                                        <span className="font-bold text-gray-700 not-italic uppercase mr-1">Note:</span>
                                        {pkg.note}
                                    </p>
                                </div>
                            )}
                        </motion.div>
                    ))}
                </div>

                <div className="mt-20">
                    <div className="max-w-3xl mx-auto bg-[#F5EEFF] rounded-3xl p-10 border-2 border-purple-200">
                        <h3 className="text-2xl font-black text-gray-900 mb-8 text-center uppercase tracking-wider">Payment Structure</h3>
                        <div className="grid md:grid-cols-2 gap-8">
                            <div className="bg-white p-6 rounded-2xl text-center shadow-sm">
                                <div className="text-4xl font-black text-[#6D28D9] mb-2">60%</div>
                                <div className="font-bold text-gray-700 uppercase tracking-widest text-sm">Onboarding</div>
                            </div>
                            <div className="bg-white p-6 rounded-2xl text-center shadow-sm">
                                <div className="text-4xl font-black text-[#6D28D9] mb-2">40%</div>
                                <div className="font-bold text-gray-700 uppercase tracking-widest text-sm text-wrap">After first interview engagement</div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 text-center font-bold text-sm text-[#6D28D9] max-w-4xl mx-auto">
                    <div className="p-4 bg-purple-50 rounded-xl">No hidden charges.</div>
                    <div className="p-4 bg-purple-50 rounded-xl">You pay for execution, not dreams.</div>
                    <div className="p-4 bg-purple-50 rounded-xl">No false promises.</div>
                </div>
            </div>
        </section>
    );
};

const TrustSection = () => (
    <section id="trust" className="py-24 bg-white text-center border-t border-gray-100">
        <div className="max-w-6xl mx-auto px-6 mb-16">
            <SectionBranding title="TRUSTED BY OUR CLIENTS" />
        </div>
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="max-w-6xl mx-auto bg-[#E9D5FF] rounded-[2rem] p-10 md:p-16 shadow-inner relative overflow-hidden border-2 border-purple-200"
        >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 items-center gap-10 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 }}
                    className="flex flex-col items-center md:items-start border-l-4 border-purple-600 pl-6"
                >
                    <div className="text-6xl md:text-7xl font-black text-[#6D28D9]">218+</div>
                    <div className="text-sm font-bold text-[#6D28D9] uppercase tracking-tighter leading-tight mt-2 text-left">
                        Trusted by <br /> our Clients
                    </div>
                </motion.div>

                <div className="hidden lg:block h-20 w-[1px] bg-purple-300 mx-auto"></div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                    className="flex flex-col items-center md:items-start border-l-4 border-purple-600 pl-6"
                >
                    <div className="text-6xl md:text-7xl font-black text-[#6D28D9]">100%</div>
                    <div className="text-sm font-bold text-[#6D28D9] uppercase tracking-tighter leading-tight mt-2 text-left">
                        Based on verified <br /> Client Engagements
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 }}
                    className="flex flex-col items-center lg:items-end text-center lg:text-right"
                >
                    <p className="text-purple-700 font-bold text-lg uppercase tracking-widest leading-none">
                        Based on verified <br /> Client Engagements
                    </p>
                </motion.div>
            </div>
        </motion.div>
    </section>
);

const ContactForm = () => {
    const [formData, setFormData] = useState({ name: '', contact: '', linkedin: '', naukri: '' });
    const [resume, setResume] = useState(null);
    const [status, setStatus] = useState(''); // '', 'sending', 'success', 'error'

    const SuccessDialog = () => (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="fixed inset-0 z-[100] flex items-center justify-center px-4"
        >
            <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setStatus('')}></div>
            <div className="bg-white rounded-[2.5rem] p-12 max-w-sm w-full relative z-10 text-center shadow-2xl border-2 border-purple-100">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path>
                    </svg>
                </div>
                <h3 className="text-3xl font-black text-gray-900 mb-2 leading-tight">Thank You!</h3>
                <p className="text-gray-600 font-medium mb-8">Your application has been submitted successfully. Our team will review it and get back to you shortly.</p>
                <button
                    onClick={() => setStatus('')}
                    className="w-full bg-[#6D28D9] text-white py-4 rounded-xl font-bold uppercase tracking-wider hover:bg-[#5B21B6] transition-colors shadow-lg shadow-purple-200"
                >
                    Dismiss
                </button>
            </div>
        </motion.div>
    );

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('sending');

        try {
            const data = new FormData();
            data.append('name', formData.name);
            data.append('contact', formData.contact);
            data.append('linkedin', formData.linkedin);
            data.append('naukri', formData.naukri);
            if (resume) data.append('resume', resume);

            const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
            await axios.post(`${apiUrl}/api/leads`, data, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            setStatus('success');
            setFormData({ name: '', contact: '', linkedin: '', naukri: '' });
            setResume(null);
        } catch (error) {
            console.error("Submission error:", error);
            setStatus('error');
        }
    };

    return (
        <section id="contact" className="py-24 bg-gray-50 border-t border-gray-100">
            <div className="max-w-2xl mx-auto px-6">
                <SectionBranding title="Apply for profile review" />
                <p className="text-gray-500 text-center mb-10">Fill in your details and let's get you hired.</p>

                <AnimatePresence>
                    {status === 'success' && <SuccessDialog />}
                </AnimatePresence>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <label className="block text-sm font-bold text-gray-700 mb-2 ml-1">Name <span className="text-red-500">*</span></label>
                        <input
                            className="w-full p-4 border border-gray-200 rounded-xl bg-gray-50 focus:bg-white transition-all focus:ring-2 focus:ring-purple-100"
                            placeholder="Name"
                            value={formData.name}
                            onChange={e => {
                                const val = e.target.value;
                                if (/^[a-zA-Z\s]*$/.test(val)) {
                                    setFormData({ ...formData, name: val });
                                }
                            }}
                            required
                        />
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                    >
                        <label className="block text-sm font-bold text-gray-700 mb-2 ml-1">Contact number <span className="text-red-500">*</span></label>
                        <input
                            className="w-full p-4 border border-gray-200 rounded-xl bg-gray-50 focus:bg-white transition-all focus:ring-2 focus:ring-purple-100"
                            placeholder="Contact number"
                            value={formData.contact}
                            onChange={e => {
                                const val = e.target.value;
                                if (/^\d*$/.test(val) && val.length <= 10) {
                                    setFormData({ ...formData, contact: val });
                                }
                            }}
                            required
                        />
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                    >
                        <label className="block text-sm font-bold text-gray-700 mb-2 ml-1">LinkedIn profile (optional)</label>
                        <input
                            className="w-full p-4 border border-gray-200 rounded-xl bg-gray-50 focus:bg-white transition-all focus:ring-2 focus:ring-purple-100"
                            placeholder="LinkedIn profile"
                            value={formData.linkedin}
                            onChange={e => setFormData({ ...formData, linkedin: e.target.value })}
                        />
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 }}
                    >
                        <label className="block text-sm font-bold text-gray-700 mb-2 ml-1">Naukri profile (optional)</label>
                        <input
                            className="w-full p-4 border border-gray-200 rounded-xl bg-gray-50 focus:bg-white transition-all focus:ring-2 focus:ring-purple-100"
                            placeholder="Naukri profile"
                            value={formData.naukri}
                            onChange={e => setFormData({ ...formData, naukri: e.target.value })}
                        />
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.4 }}
                    >
                        <label className="block text-sm font-bold text-gray-700 mb-2 ml-1 text-center">Upload your Resume (optional)</label>
                        <div className="flex flex-col items-center justify-center border-2 border-dashed border-purple-200 rounded-xl p-6 bg-gray-50 hover:bg-purple-50 transition-colors group">
                            <input
                                type="file"
                                id="resume-upload"
                                className="hidden"
                                onChange={e => setResume(e.target.files[0])}
                            />
                            <label htmlFor="resume-upload" className="cursor-pointer flex flex-col items-center">
                                <FileText className="w-10 h-10 text-[#6D28D9] mb-2 group-hover:scale-110 transition-transform" />
                                <span className="text-gray-600 font-medium group-hover:text-[#6D28D9] transition-colors">
                                    {resume ? resume.name : "Click to upload Resume (PDF/DOC)"}
                                </span>
                            </label>
                        </div>
                    </motion.div>

                    {status === 'error' && (
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-red-500 text-center font-bold"
                        >
                            Error submitting. Please try again.
                        </motion.p>
                    )}

                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        type="submit"
                        disabled={status === 'sending'}
                        className="w-full bg-[#6D28D9] text-white p-5 rounded-xl font-bold text-lg hover:bg-[#5B21B6] transition-colors shadow-lg shadow-purple-200 disabled:opacity-70 mt-4 uppercase tracking-wider"
                    >
                        {status === 'sending' ? 'Submitting...' : 'Apply for profile review'}
                    </motion.button>
                </form>
            </div>
        </section>
    );
};

const Footer = () => (
    <footer className="bg-white py-12 border-t border-gray-100">
        <div className="max-w-6xl mx-auto px-6">
            <div className="text-center mb-8">
                <h2 className="text-purple-600 font-bold text-xl mb-4">contact us</h2>
            </div>
            <div className="flex flex-col md:flex-row justify-between items-start text-sm text-gray-700 font-medium space-y-8 md:space-y-0">
                <div className="space-y-4">
                    <div className="flex items-center">
                        <span className="mr-3">📧</span> operations@profileera.com
                    </div>
                    <div className="flex items-center">
                        <span className="mr-3">📞</span> (+91) 9392852329
                    </div>
                    <div className="flex items-center">
                        <span className="mr-3">📍</span> T-Hub, Phase 2, Knowledge City, Rai Durg<br />Hyderabad - 500081, Telangana
                    </div>
                </div>

                <div className="flex flex-col items-center">
                    <Logo className="mb-2" />
                </div>
            </div>
            <div className="mt-12 pt-8 border-t border-gray-50 text-center text-xs text-gray-400">
                Copyright © 2026 ProfileEra - All Rights Reserved
            </div>
        </div>
    </footer>
);

const LandingPage = () => {
    return (
        <div className="font-sans text-gray-900 overflow-x-hidden">
            <Navbar />
            <Hero />
            <WhoIsThisFor />
            <ProblemAccordion />
            <TrustSection />
            <Services />
            <Pricing />
            <ContactForm />
            <Footer />
        </div>
    );
};

const App = () => {
    const [adminKey, setAdminKey] = useState(localStorage.getItem('adminKey'));

    const handleLogin = (key) => {
        setAdminKey(key);
    };

    const handleLogout = () => {
        localStorage.removeItem('adminKey');
        setAdminKey(null);
    };

    return (
        <Router>
            <Routes>
                {/* Public Site */}
                <Route path="/" element={<LandingPage />} />

                {/* Admin Routes */}
                <Route
                    path="/admin"
                    element={
                        adminKey ? (
                            <Navigate to="/admin/dashboard" />
                        ) : (
                            <AdminLogin onLogin={handleLogin} />
                        )
                    }
                />

                <Route
                    path="/admin/dashboard"
                    element={
                        adminKey ? (
                            <AdminDashboard adminKey={adminKey} onLogout={handleLogout} />
                        ) : (
                            <Navigate to="/admin" />
                        )
                    }
                />

                {/* Catch-all redirect to home */}
                <Route path="*" element={<Navigate to="/" />} />
            </Routes>
        </Router>
    );
};

export default App;
