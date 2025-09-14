import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';


import image from '../assets/image.png';
import image6 from '../assets/6.png';
import image7 from '../assets/7.png';
import image8 from '../assets/8.png';
import image9 from '../assets/9.png';
import image10 from '../assets/10.png';
import image11 from '../assets/11.png';
import image12 from '../assets/12.png';
import image13 from '../assets/13.png';
import image14 from '../assets/14.png';
import image15 from '../assets/15.png';

import image16 from '../assets/16.png';
import image17 from '../assets/17.png';
import image18 from '../assets/18.png';
import image19 from '../assets/19.png';
import image20 from '../assets/20.png';

import Logo from '../assets/ahis.png';

const imageDashboard = "https://i.imgur.com/uJIkY3F.png";
const imageMap = "https://i.imgur.com/s4p6mYj.png";


const LoginModal = ({ isOpen, onClose }) => {
    const navigate = useNavigate();
    const modalRef = useRef(null);

    const [selectedRole, setSelectedRole] = useState('');

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (modalRef.current && !modalRef.current.contains(event.target)) {
                onClose();
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [onClose]);
    const handleFormSubmit = (e) => {
        e.preventDefault();

        if (!selectedRole) {
            alert("Please select a role to continue.");
            return;
        }

        let path = '';


        switch (selectedRole) {
            case 'admin':
                path = '/dashboard';
                break;
            case 'doctor':
                path = '/doctor-portal';
                break;
            case 'patient':
                path = '/patient-records';
                break;
            case 'pharmacy':
                path = '/pharmacy';
                break;
            case 'staff':
                path = '/staff-area';
                break;
            default:
                path = '/';
                break;
        }

        console.log(`Navigating to: ${path}`);
        navigate(path);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex justify-center items-center p-4 transition-opacity duration-300">
            <div
                ref={modalRef}
                className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-sm relative transform transition-all duration-300 ease-out"
            >
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 p-1 rounded-full text-gray-400 hover:text-gray-800 hover:bg-gray-100 transition-colors"
                    aria-label="Close modal"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>

                <div className="flex justify-center mb-5">
                    <img src={Logo} alt="AHIS Logo" className="h-16 w-auto" />
                </div>

                <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">Welcome Back</h2>

                <form onSubmit={handleFormSubmit} className="space-y-5">
                    <div>
                        <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-1">
                            Select Role
                        </label>
                        <select
                            id="role"
                            name="role"
                            className="w-full px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#8053C6] focus:border-[#8053C6] transition"
                            required
                            value={selectedRole}
                            onChange={(e) => setSelectedRole(e.target.value)}
                        >
                            <option value="" disabled>Choose your role</option>
                            <option value="admin">Admin</option>
                            <option value="doctor">Doctor</option>
                            <option value="patient">Patient</option>
                            <option value="pharmacy">Pharmacy</option>
                            <option value="staff">Staff</option>
                        </select>
                    </div>

                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                            Email Address
                        </label>
                        <input
                            type="email"
                            id="email"
                            placeholder="you@example.com"
                            className="w-full px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#8053C6] focus:border-[#8053C6] transition"
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            placeholder="••••••••"
                            className="w-full px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#8053C6] focus:border-[#8053C6] transition"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full p-3 text-white font-bold rounded-lg bg-[#D055D5]  hover:opacity-90 shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5"
                    >
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
};


const CheckCircleIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3 text-[#D055D5] flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
    </svg>
);

const FeatureIcon = ({ children }) => (
    <div className="w-20 h-20 mx-auto bg-gradient-to-br from-white to-gray-50 shadow-md rounded-full flex items-center justify-center text-[#8053C6]">
        {children}
    </div>
);

const productsData = [
    {
        id: 'opd',
        name: 'Outpatient Management',
        title: 'Outpatient Management (OPD Module)',
        image: image6,
        description: 'Manage hospitals and chain of clinics of any size across multiple geographical locations with a single login from our OPD module. Enhance transparency, streamline workflows, and increase patient engagement through communication management.',
        features: ["Patient Registration", "Appointment", "Queue Management", "OP Billing", "Templates", "EHR (Electronic Health Record)", "Integrated with Lab and Pharmacy", "Role Based Access Management", "Communication Management", "Report and Analytics", "Multi-Location Management"]
    },
    {
        id: 'ipd',
        name: 'Inpatient Management',
        title: 'Inpatient Management (IPD Module)',
        image: image7,
        description: 'Efficiently manage all aspects of patient admission, bed allocation, treatment, and discharge. Our IPD module ensures seamless coordination between departments for optimal patient care.',
        features: ["Admission, Discharge, Transfer (ADT)", "Bed Management", "Ward & Room Management", "Doctor's Notes & Orders", "Nursing Station Management", "IP Billing & Insurance", "Discharge Summary", "Dietary Management", "Operation Theatre Scheduling"]
    },
    {
        id: 'lims',
        name: 'LIMS (Lab)',
        title: 'Laboratory Information Management System',
        image: image8,
        description: 'Automate your laboratory workflows, from sample collection to report generation. Our LIMS module integrates with diagnostic equipment to reduce manual errors and improve turnaround time.',
        features: ["Sample Collection & Tracking", "Test Order Management", "Machine Interfacing", "Quality Control", "Report Generation & Dispatch", "Billing Integration", "Historical Data Analysis", "STAT & Urgent Request Handling"]
    },
    {
        id: 'pharmacy',
        name: 'Pharmacy Management',
        title: 'Comprehensive Pharmacy Management',
        image: image9,
        description: 'A complete solution for managing pharmacy operations, including inventory, sales, and regulatory compliance, fully integrated with OPD and IPD billing.',
        features: ["Inventory Control", "Stock Management", "Purchase Order Generation", "Supplier Management", "Prescription Management", "Sales & Billing (OPD/IPD)", "Expiry Alerts", "Barcode Integration"]
    },
    {
        id: 'ehr',
        name: 'EHR (Electronic Health Record)',
        title: 'Secure Electronic Health Records',
        image: image10,
        description: 'Maintain a comprehensive, secure, and easily accessible digital record of patient health information, improving clinical decision-making and patient safety.',
        features: ["Patient Demographics", "Medical History", "Diagnosis & Treatment Plans", "e-Prescribing", "Clinical Notes", "Allergy Information", "Patient Vitals Tracking", "Secure Data Storage"]
    },
    {
        id: 'inventory',
        name: 'Inventory Management',
        title: 'Hospital Inventory Management',
        image: image11,
        description: 'Streamline the procurement, storage, and distribution of hospital supplies and assets, ensuring availability while minimizing costs.',
        features: ["Stock Tracking & Alerts", "Purchase Requisitions", "Goods Receipt Notes (GRN)", "Asset Management", "Department-wise Stock Issue", "Supplier Management", "Stock Audits", "Consumption Reports"]
    },
    {
        id: 'ris-pacs',
        name: 'RIS and PACS',
        title: 'Radiology Information System & PACS',
        image: image12,
        description: 'Integrate and manage imaging workflows, from scheduling to reporting and archiving, for faster and more accurate diagnostics.',
        features: ["Patient Scheduling", "Radiologist Worklist", "Image Archiving (PACS)", "Reporting & Transcription", "Billing Integration", "DICOM Viewer"]
    },
    {
        id: 'clinical-assessment',
        name: 'Clinical Assessment Forms',
        title: 'Customizable Clinical Assessment Forms',
        image: image13,
        description: 'Create and manage digital forms for various clinical assessments, ensuring standardized data collection and easy retrieval.',
        features: ["Form Builder", "Pre-built Templates", "Digital Signatures", "Data Validation", "Integration with EHR", "Analytics on Form Data"]
    },
    {
        id: 'revenue-cycle',
        name: 'Healthcare Revenue Management',
        title: 'Revenue Cycle / TPA Management',
        image: image14,
        description: 'Optimize your revenue cycle from patient registration to final payment, including seamless management of TPA claims.',
        features: ["Patient Registration & Insurance Verification", "Charge Capture", "Claims Submission", "Payment Posting", "Denial Management", "TPA & Insurance Portals"]
    },
    {
        id: 'fhir',
        name: 'FHIR Compliant',
        title: 'FHIR Compliant for Interoperability',
        image: image15,
        description: 'Ensure seamless data exchange and interoperability with other healthcare systems using the latest FHIR standards.',
        features: ["Standardized APIs", "Secure Data Exchange", "Patient Data Portability", "Integration with Health Apps", "Ecosystem Compatibility", "Future-proof Architecture"]
    },
    {
        id: 'ot-management',
        name: 'Operation Theater Management',
        title: 'Operation Theater Management',
        image: image16,
        description: 'The operation theater module handles operation theater scheduling and planning, surgery team management, patient monitoring, operation theater consumable management, resource planning, and more.',
        features: ["OT Booking & Scheduling", "IP Integration", "Lab & Radiology Integration", "Inventory Management", "Surgery & Recovery", "Case Notes & Observation", "Post Surgery Instructions", "Detailed OT Summary", "OT Billing"]
    },
    {
        id: 'workforce',
        name: 'Workforce Management',
        title: 'Workforce Management',
        image: image17,
        description: "For a seamless and organised workflow, our HR & Payroll Management Software automates all payroll-related procedures as well as high-value HR core processes.",
        features: ["Employee Management", "Document Management", "Employee Self-Service", "Workflow Management", "Employee Happiness", "Payroll Inputs", "Multi-Pay Periods", "Salary on Hold", "Claims Management"]
    },
    {
        id: 'communication',
        name: 'Communication Management',
        title: 'Communication Management',
        image: image18,
        description: 'Our software offers a streamlined communication solution between patients and doctors. Send single or bulk SMS and WhatsApp texts, or use our mobile app to make a voice call with your patients.',
        features: ["Tele-Consultation", "OP & IP Billing Messaging", "Lab & Radiology Test Reports", "Patient Retention", "Improved Operating Efficiency", "Eradicate Medical Errors"]
    },
    {
        id: 'connected-care',
        name: 'Connected Care',
        title: 'Connected Care',
        image: image19,
        description: 'Integrated with FDA, CE and ISO certified medical devices for continuous and contactless vitals monitoring. Vitals are captured automatically and saved to the patient\'s electronic health record (EHR).',
        features: ["Effortless Patient Engagement", "Easy Follow-up Calls In-App", "Maintain Transparency", "Improved Patient Retention", "Enhanced Operating Efficiency", "Reduction in Medical Errors"]
    }
];


const ProductsSection = () => {
    const [activeId, setActiveId] = useState(productsData[0].id);
    const sectionRefs = useRef({});

    useEffect(() => {
        const handleScroll = () => {
            const topOffset = window.innerHeight * 0.4;
            let currentId = '';

            for (const product of productsData) {
                const element = sectionRefs.current[product.id];
                if (element) {
                    const rect = element.getBoundingClientRect();
                    if (rect.top <= topOffset && rect.bottom >= topOffset) {
                        currentId = product.id;
                        break;
                    }
                }
            }

            if (currentId && activeId !== currentId) {
                setActiveId(currentId);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [activeId]);

    const handleNavClick = (id) => {
        setActiveId(id);
        sectionRefs.current[id]?.scrollIntoView({
            behavior: 'smooth',
            block: 'center',
        });
    };

    const BulletPoint = ({ text }) => (
        <li className="flex items-start">
            <svg className="w-4 h-4 mr-2 mt-1 text-purple-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg>
            <span>{text}</span>
        </li>
    );

    const AccordionView = () => (
        <div className="md:hidden space-y-2">
            {productsData.map((product) => (
                <div key={product.id} className="border border-gray-200 rounded-lg overflow-hidden">
                    <button
                        onClick={() => setActiveId(activeId === product.id ? null : product.id)}
                        className="w-full text-left p-4 bg-gray-50 hover:bg-gray-100 flex justify-between items-center font-semibold text-[#8053C6]"
                    >
                        {product.name}
                        <svg className={`w-5 h-5 transition-transform ${activeId === product.id ? 'transform rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                    </button>
                    {activeId === product.id && (
                        <div className="p-4 bg-white">
                            <div className="flex-shrink-0 w-32 h-32 bg-purple-100 rounded-full flex items-center justify-center overflow-hidden shadow-md border-4 border-white mx-auto mb-4">
                                <img src={product.image} alt={product.name} className="object-cover w-full h-full" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-800 text-center mb-2">{product.title}</h3>
                            <p className="text-gray-600 text-sm leading-relaxed mb-4">{product.description}</p>
                            <div className="grid grid-cols-1 gap-x-4 gap-y-2 text-gray-700 text-sm">
                                {product.features.map((feature, index) => <BulletPoint key={index} text={feature} />)}
                            </div>
                        </div>
                    )}
                </div>
            ))}
        </div>
    );

    const DesktopView = () => (
        <div className="hidden md:flex gap-16">
            <aside className="w-1/4">
                <div className="sticky top-24">
                    <h3 className="text-3xl font-bold mb-6 text-[#8053C6]">Products</h3>
                    <ul className="space-y-1">
                        {productsData.map((product) => (
                            <li key={product.id}>
                                <button
                                    onClick={() => handleNavClick(product.id)}
                                    className={`w-full text-left px-4 py-3 rounded-lg text-base font-medium transition-all duration-300 ${activeId === product.id
                                        ? 'bg-[#8053C6] text-white shadow-lg'
                                        : 'text-gray-600 hover:bg-purple-50 hover:text-[#8053C6]'
                                        }`}
                                >
                                    {product.name}
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            </aside>
            <div className="w-3/4 space-y-16">
                {productsData.map(product => (
                    <div key={product.id} id={product.id} ref={el => sectionRefs.current[product.id] = el} className="min-h-[60vh]">
                        <h2 className="text-4xl font-extrabold text-gray-800 mb-4">{product.title}</h2>
                        <div className="flex flex-col lg:flex-row items-start gap-8 mb-6">
                            <div className="flex-shrink-0 w-48 h-48 bg-purple-100 rounded-full flex items-center justify-center overflow-hidden shadow-md border-4 border-white">
                                <img src={product.image} alt={product.name} className="object-cover w-full h-full" />
                            </div>
                            <p className="text-gray-600 text-base leading-relaxed mt-2">{product.description}</p>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4 text-gray-700">
                            {product.features.map((feature, index) => <BulletPoint key={index} text={feature} />)}
                        </div>
                        <div className="mt-10">
                            <a href="#" className="bg-[#D055D5] text-white font-bold py-3 px-8 rounded-lg shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5 inline-block">
                                Register for a Free Trial
                            </a>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );

    return (
        <section id="products" className="py-24">
            <div className="container mx-auto px-6">
                <AccordionView />
                <DesktopView />
            </div>
        </section>
    );
}


const testimonials = [
    {
        name: 'Dr. G Senthil Kumar',
        title: 'Dental Surgeon',
        quote: 'I was using a high cost HMS for 4 years before I switched to Ezovion Orthopedic Practice Management Software. Ezovion is easy to use, has complete EMR, PACS integration which helps my Ortho practice more efficiently. My existing patient data migration was seamlessly taken care of during Ezovion implementation.'
    },
    {
        name: 'Ravi Kumar',
        title: 'IT Head, Sunshine Healthcare',
        quote: 'The FHIR compliance and robust security features were key for us. The system is intuitive for staff and provides management with invaluable real-time analytics.'
    },
    {
        name: 'Priya Mehta',
        title: 'Pharmacy Manager, Wellness Clinics',
        quote: 'Inventory and pharmacy management has never been easier. Expiry alerts and automated reordering have optimized our stock levels and prevented wastage.'
    },
    {
        name: 'Sameer Gupta',
        title: 'CEO, Horizon Medical Group',
        quote: 'Implementing this software was the best decision for our multi-location clinics. The centralized data management gives us a complete overview of our entire operation.'
    },
];

const TestimonialsSection = () => {
    const [currentIndex, setCurrentIndex] = useState(0);


    useEffect(() => {
        const timer = setTimeout(() => {
            const nextIndex = (currentIndex + 1) % testimonials.length;
            setCurrentIndex(nextIndex);
        }, 5000);

        return () => clearTimeout(timer);
    }, [currentIndex]);

    const goToPrevious = () => {
        const isFirstSlide = currentIndex === 0;
        const newIndex = isFirstSlide ? testimonials.length - 1 : currentIndex - 1;
        setCurrentIndex(newIndex);
    };

    const goToNext = () => {
        const isLastSlide = currentIndex === testimonials.length - 1;
        const newIndex = isLastSlide ? 0 : currentIndex + 1;
        setCurrentIndex(newIndex);
    };

    return (
        <section id="testimonials" className="bg-white py-24">
            <div className="container mx-auto px-6">
                <div className="text-center mb-12">
                    <p className="font-semibold text-gray-500 text-sm tracking-wider">TRUSTED BY PROVIDERS ACROSS INDIA</p>
                    <h2 className="text-4xl font-extrabold text-[#8053C6] mt-2">Our Customers Rated Us the Best!</h2>
                </div>

                <div className="relative max-w-4xl mx-auto flex items-center justify-center min-h-[250px]">
                    {/* Left Arrow */}
                    <button
                        onClick={goToPrevious}
                        className="absolute left-0 sm:-left-8 z-10 p-2 rounded-full bg-white/50 hover:bg-white transition-colors shadow-md"
                        aria-label="Previous testimonial"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                        </svg>
                    </button>

                    {/* Testimonial Container */}
                    <div className="relative w-full h-full overflow-hidden">
                        <div
                            className="flex transition-transform duration-700 ease-in-out"
                            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                        >
                            {testimonials.map((testimonial, index) => (
                                <div key={index} className="flex-shrink-0 w-full box-border">
                                    <div className="bg-white p-8 md:p-12 rounded-lg shadow-xl border border-gray-100 text-center max-w-3xl mx-auto">
                                        <p className="text-lg text-gray-600 leading-relaxed italic">
                                            "{testimonial.quote}"
                                        </p>
                                        <div className="mt-8">
                                            <p className="font-bold text-lg text-[#D055D5]">{testimonial.name}</p>
                                            <p className="text-sm text-gray-500">{testimonial.title}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>


                    <button
                        onClick={goToNext}
                        className="absolute right-0 sm:-right-8 z-10 p-2 rounded-full bg-white/50 hover:bg-white transition-colors shadow-md"
                        aria-label="Next testimonial"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                        </svg>
                    </button>
                </div>
            </div>
        </section>
    );
};


// ++ SERVICES DROPDOWN COMPONENT ++
const ServicesDropdown = () => {
    const devServices = [
        { title: 'iOS', description: 'Build your native iOS Apps with Swift and Obj. C' },
        { title: 'Android', description: 'Native Android app development with Java and Kotlin' },
        { title: 'Cross Platform', description: 'Cross platform mobile apps using Javascript, HTML5 and Dart' },
        { title: 'Web Development', description: 'Offering smooth and secure Web Applications Development Services' },
        { title: 'UI/UX Design', description: 'Great way to kickstart your digital journey with seamless user experience' },
        { title: 'Full Stack', description: 'Seamless end to end product development, from Frontend to Backend.' },
    ];
    const enterpriseServices = [
        { title: 'Enterprise App', description: 'Transforming your business process digitally.' },
        { title: 'ServiceNow', description: 'Expert ServiceNow Implementation for Your Business.' },
    ];

    const ServiceItem = ({ title, description }) => (
        <div className="hover:bg-gray-50 p-3 rounded-lg transition-colors duration-200 cursor-pointer">
            <h4 className="font-bold text-gray-800">{title}</h4>
            <p className="text-sm text-gray-500">{description}</p>
        </div>
    );

    const SectionTitle = ({ title }) => (
        <div className="flex items-center mb-4">
            <div className="p-1.5 bg-purple-100 rounded-md mr-3">
                <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        </div>
    );

    return (
        <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-screen max-w-4xl">
            <div className="bg-white rounded-lg shadow-2xl p-8 border border-gray-100">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-12 gap-y-8">
                    {/* Custom Software Development Section */}
                    <div>
                        <SectionTitle title="Custom Software Development" />
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {devServices.map(service => <ServiceItem key={service.title} {...service} />)}
                        </div>
                    </div>

                    {/* Enterprise Solution Section */}
                    <div>
                        <SectionTitle title="Enterprise Solution" />
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {enterpriseServices.map(service => <ServiceItem key={service.title} {...service} />)}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};


function HomePage() {
    const [isLoginModalOpen, setLoginModalOpen] = useState(false);
    // State for services menu visibility
    const [isServicesMenuOpen, setServicesMenuOpen] = useState(false);

    const keyFeatures1 = ["Appointment Management", "OPD Management", "IPD Management", "Billing & Invoicing", "Discharge Summary", "OT Management", "Pharmacy Management", "Referral Management"];
    const keyFeatures2 = ["Laboratory Management", "Radiology Management", "Inventory Management", "Financial Accounting", "HR & Payroll", "MIS Reports", "Mobile App", "Patient Portal"];

    return (
        <div style={{ fontFamily: "'Poppins', sans-serif" }} className="bg-white text-[#333]">
            <header className="bg-white/80 backdrop-blur-lg shadow-sm sticky top-0 z-40">
                <div className="container mx-auto flex justify-between items-center p-4 px-6">
                    <h1 className="text-3xl font-extrabold text-[#8053C6]">AHIS</h1>
                    <nav className="hidden md:flex space-x-10 text-base font-medium text-gray-600 items-center">
                        <Link to="#home" className="hover:text-[#8053C6] transition-colors">Home</Link>

                        {/* Services Menu Item with Hover Logic */}
                        <div
                            className="relative"
                            onMouseEnter={() => setServicesMenuOpen(true)}
                            onMouseLeave={() => setServicesMenuOpen(false)}
                        >
                            <button className="flex items-center hover:text-[#8053C6] transition-colors cursor-pointer">
                                Services
                                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                            </button>
                            {isServicesMenuOpen && <ServicesDropdown />}
                        </div>

                        <Link to="#products" className="hover:text-[#8053C6] transition-colors">Products</Link>
                        <Link to="#testimonials" className="hover:text-[#8053C6] transition-colors">Testimonials</Link>
                        <Link to="#contact" className="hover:text-[#8053C6] transition-colors">Contact Us</Link>
                    </nav>
                    <div className="flex items-center space-x-3">
                        <button
                            onClick={() => setLoginModalOpen(true)}
                            className="font-semibold text-[#8053C6] px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors"
                        >
                            Login
                        </button>
                        <a href="#" className="bg-[#D055D5] text-white font-semibold px-5 py-2 rounded-lg shadow-md hover:shadow-lg transition-shadow">Sign Up</a>
                    </div>
                </div>
            </header>

            <main>
                <section className="bg-[#FAF7FF] pt-12 pb-20">
                    <div className="container mx-auto grid md:grid-cols-2 gap-12 items-center px-6">
                        <div>
                            <h2 className="text-5xl font-extrabold leading-tight"> Leading Hospital <br /> Management Software <br /> in India </h2>
                            <p className="text-gray-500 mt-5 text-base leading-relaxed"> HYSAS offers advanced hospital management software to streamline all your hospital operations, from appointments to billing, and enhance patient care. </p>
                            <ul className="mt-6 space-y-3">
                                <li className="flex items-center font-medium"><CheckCircleIcon /> OPD Management</li>
                                <li className="flex items-center font-medium"><CheckCircleIcon /> IPD Management</li>
                                <li className="flex items-center font-medium"><CheckCircleIcon /> Billing & Invoicing</li>
                                <li className="flex items-center font-medium"><CheckCircleIcon /> Secured Electronic Medical Records</li>
                            </ul>
                            <div className="bg-white p-7 rounded-2xl shadow-xl mt-9 border border-gray-100">
                                <h3 className="text-xl font-bold text-center mb-5">Sign Up for a Free Trial</h3>
                                <form className="space-y-4">
                                    <input type="text" placeholder="Hospital/Clinic Name" className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#c056d4]/50 focus:border-[#c056d4] transition" />
                                    <input type="email" placeholder="Email" className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#c056d4]/50 focus:border-[#c056d4] transition" />
                                    <input type="tel" placeholder="Mobile Number" className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#c056d4]/50 focus:border-[#c056d4] transition" />
                                    <button type="submit" className="w-full p-3.5 text-white font-bold rounded-lg bg-[#D055D5] hover:opacity-95 shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5">Start My Free Trial</button>
                                </form>
                                <p className="text-xs text-gray-500 text-center mt-4">By signing up, you agree to our Terms & Conditions.</p>
                            </div>
                        </div>
                        <div className="text-center"> <img src={image} alt="Healthcare Professional" className="max-w-full mx-auto" /> </div>
                    </div>
                </section>

                <section className="py-24">
                    <div className="container mx-auto px-6">
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-x-8 gap-y-12 text-center">
                            <div>
                                <FeatureIcon> <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M12 6V3m0 18v-3M5.636 5.636L4.222 4.222m15.556 15.556L18.364 18.364M18.364 5.636L19.778 4.222m-15.556 15.556l1.414-1.414M12 12a4 4 0 11-8 0 4 4 0 018 0z" /></svg> </FeatureIcon>
                                <h4 className="font-bold text-lg mt-5">Enhanced <br />Patient Care</h4>
                            </div>
                            <div>
                                <FeatureIcon> <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg> </FeatureIcon>
                                <h4 className="font-bold text-lg mt-5">Streamline <br />Appointment</h4>
                            </div>
                            <div>
                                <FeatureIcon> <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg> </FeatureIcon>
                                <h4 className="font-bold text-lg mt-5">Simplified <br />Billing Process</h4>
                            </div>
                            <div>
                                <FeatureIcon> <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg> </FeatureIcon>
                                <h4 className="font-bold text-lg mt-5">Secured Electronic <br />Medical Records</h4>
                            </div>
                            <div>
                                <FeatureIcon> <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg> </FeatureIcon>
                                <h4 className="font-bold text-lg mt-5">Efficient Inventory <br />Management</h4>
                            </div>
                        </div>
                    </div>
                </section>

                <section id="features" className="bg-[#FAF7FF] py-24">
                    <div className="container mx-auto px-6">
                        <div className="text-center mb-16">
                            <h2 className="text-4xl font-extrabold">Key Features</h2>
                            <p className="text-gray-500 mt-3 text-lg">Comprehensive features to manage your hospital efficiently.</p>
                        </div>
                        <div className="flex flex-col lg:flex-row items-center justify-center gap-10">
                            <div className="w-full lg:w-1/4">
                                <ul className="space-y-4 text-gray-700 font-medium text-right"> {keyFeatures1.map(feature => <li key={feature} className="flex items-center justify-end"><span className="mr-3">{feature}</span> <span className="text-2xl text-[#8053C6]">◇</span></li>)} </ul>
                            </div>
                            <div className="w-full lg:w-1/2 px-8"> <img src={imageDashboard} alt="Software Dashboard" className="max-w-full rounded-lg shadow-2xl" /> </div>
                            <div className="w-full lg:w-1/4">
                                <ul className="space-y-4 text-gray-700 font-medium"> {keyFeatures2.map(feature => <li key={feature} className="flex items-center"><span className="text-2xl mr-3 text-[#8053C6]">◇</span> {feature}</li>)} </ul>
                            </div>
                        </div>
                        <div className="text-center mt-16"> <button className="bg-[#D055D5] text-white font-bold py-3 px-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow transform hover:-translate-y-0.5">View All Features</button> </div>
                    </div>
                </section>

                <section className="py-24">
                    <div className="container mx-auto px-6 text-center">
                        <h2 className="text-4xl font-extrabold">Our Customer Presence</h2>
                        <p className="text-gray-500 mt-3 text-lg mb-10">Serving healthcare providers across the length and breadth of India.</p>
                        <img src={imageMap} alt="Map of India with customer locations" className="max-w-4xl mx-auto" />
                    </div>
                </section>

                <ProductsSection />
                <TestimonialsSection />
            </main>

            <footer id="contact" className="bg-gray-800 text-white">
                <div className="container mx-auto py-16 px-6">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        <div>
                            <h3 className="text-2xl font-bold text-white mb-4">AHIS</h3>
                            <p className="text-gray-400">Streamlining healthcare management with advanced, intuitive software solutions.</p>
                        </div>
                        <div>
                            <h4 className="font-semibold text-lg mb-4">Quick Links</h4>
                            <ul className="space-y-2 text-gray-400">
                                <li><a href="#home" className="hover:text-white">Home</a></li>
                                <li><a href="#products" className="hover:text-white">Products</a></li>
                                <li><a href="#testimonials" className="hover:text-white">Testimonials</a></li>
                                <li><a href="#contact" className="hover:text-white">Contact Us</a></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-semibold text-lg mb-4">Contact</h4>
                            <ul className="space-y-2 text-gray-400">
                                <li><p>123 Health St, MedCity</p></li>
                                <li><p>contact@ahis.com</p></li>
                                <li><p>+91 123 456 7890</p></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-semibold text-lg mb-4">Newsletter</h4>
                            <p className="text-gray-400 mb-3">Stay updated with our latest features.</p>
                            <form className="flex">
                                <input type="email" placeholder="Your Email" className="w-full rounded-l-lg p-2 text-gray-800" />
                                <button className="bg-[#D055D5] p-2 rounded-r-lg font-bold">Go</button>
                            </form>
                        </div>
                    </div>
                    <div className="text-center text-gray-500 border-t border-gray-700 mt-10 pt-6">
                        <p>&copy; 2024 AHIS. All Rights Reserved.</p>
                    </div>
                </div>
            </footer>

            <LoginModal
                isOpen={isLoginModalOpen}
                onClose={() => setLoginModalOpen(false)}
            />
        </div>
    );
}

export default HomePage;