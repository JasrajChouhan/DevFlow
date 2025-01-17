import LeftSidebar from "@/components/navigation/LeftSidebar";
import Navbar from "@/components/navigation/navbar";

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="background-light850_dark100">
      <Navbar />

      <div className="flex">
        {/* left sidebar */}
        <LeftSidebar />

        <section className="flex min-h-screen flex-1 flex-col px-6 pb-6 pt-36 max-md:pb-14 sm:px-14">
          <div className="mx-auto w-full max-w-5xl">{children}</div>
        </section>

        {/* left sidebar */}
      </div>
    </main>
  );
};

export default RootLayout;

// put navbar above children
