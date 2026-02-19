import Navbar from '@/components/ui/Nav/navbar';

export default function WithNavbarLayout({
    children }: {
        children: React.ReactNode
    }) {
    return (
        <>
            <div className="fixed top-5 w-full flex items-center justify-center z-100 ">
                <Navbar />
            </div>
            {children}
        </>
    );
}