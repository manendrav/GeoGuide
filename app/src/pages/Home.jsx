import { Link } from "react-router-dom";
import Button from "../components/layout/Button";
import { GoStarFill } from "react-icons/go";
import { FaUsers, FaMapLocationDot } from "react-icons/fa6";
import { RiRoadMapFill } from "react-icons/ri";
import { CgSearchFound } from "react-icons/cg";
import { MdExplore, MdOutlineMiscellaneousServices } from "react-icons/md";

export default function Home() {
  return (
    <div>
      <div className="flex flex-col min-h-[100dvh] max-w-6xl mx-auto">
        <main className="flex-1">
          <section className="w-full py-6 flex justify-center">
            <div className="container px-4 md:px-6 ">
              <div className="flex flex-col justify-center items-center md:flex-row min-[320px]:text-center min-[600px]:text-left gap-10 ">
                <div className="tags dark:text-gray-100">
                  <h1 className="text-4xl ml-3 font-bold tracking-wide sm:text-5xl xl:text-5xl/none">
                    Welcome to
                  </h1>
                  <h3 className="text-4xl font-bold tracking-normal sm:text-5xl xl:text-8xl/none">
                    Geo
                    <span className="text-[#e463fd] font-shadows">Guide</span>
                  </h3>
                  <p className="max-w-[500px] ml-3 font-medium my-5 text-gray-600 md:text-lg/snug lg:text-base/snug xl:text-lg/snug dark:text-gray-400">
                    Unlock convenience at your fingertips. Discover nearby
                    services tailored to your preferences instantly.
                  </p>

                  <Button className="ml-4">
                    <Link to="/explore">Get Started</Link>
                  </Button>
                </div>

                <div className="">
                  <img
                    alt="Hero"
                    className="mx-auto overflow-hidden "
                    src="/hero-1.png"
                    width="500"
                    loading="lazy"
                  />
                </div>
              </div>
            </div>
          </section>

          {/* features sectoins start*/}
          <section className="w-full px-10 py-10">
            <div className="tag text-3xl text-center font-bold uppercase leading-4 tracking-wide dark:text-gray-100">
              <h1>Features</h1>
            </div>

            <div className="flex py-10 gap-10 min-[320px]:flex-col min-[746px]:flex-row text-center">
              <div className="flex flex-col items-center py-14 justify-center bg-white border rounded-xl shadow-xl p-6 hover:bg-[#bc76fd] text-gray-400 hover:text-gray-200 transition ease-in dark:border-none dark:bg-gray-800">
                <div className="text-4xl mb-4 bg-purple-400 text-white rounded-full p-3">
                  {<FaUsers size="0.9em" />}
                </div>
                <h2 className="text-xl font-semibold mb-2 text-gray-800 dark:text-gray-200">
                  Tailored Suggestions
                </h2>
                <p className="py-2 px-7 ">
                  Explore services that match your preferences, ensuring every
                  recommendation is tailored to your individual tastes and
                  requirements.
                </p>
              </div>

              <div className="flex flex-col items-center py-14 justify-center bg-white border rounded-xl shadow-xl p-6 hover:bg-[#bc76fd] text-gray-400 hover:text-gray-200 transition ease-in dark:border-none dark:bg-gray-800">
                <div className="text-4xl mb-4 bg-purple-400 text-white rounded-full p-3">
                  {<GoStarFill size="0.9em" />}
                </div>
                <h2 className="text-xl font-semibold mb-2 text-gray-800 dark:text-gray-200">
                  Reviews and Ratings
                </h2>
                <p className="py-2 px-5">
                  Make informed decisions with insights from fellow users,
                  helping you choose the best services with confidence and
                  trust.
                </p>
              </div>

              <div className="flex flex-col items-center py-14 justify-center bg-white border rounded-xl shadow-xl p-6 hover:bg-[#bc76fd] text-gray-400 hover:text-gray-200 transition ease-in dark:border-none dark:bg-gray-800">
                <div className="text-4xl mb-4 bg-purple-400 text-white rounded-full p-3">
                  {<FaMapLocationDot size="0.9em" />}
                </div>
                <h2 className="text-xl font-semibold mb-2 text-gray-800 dark:text-gray-200">
                  Visual Integration
                </h2>
                <p className="py-2 px-5">
                  Visualize nearby services on an interactive map for effortless
                  navigation and seamless exploration of your surroundings.
                </p>
              </div>
            </div>
          </section>

          {/* about section start  */}
          <section className="w-full mt-10  flex justify-center">
            <div className="container flex flex-col items-center px-4 text-center md:flex-row">
              <div>
                <img
                  alt="Image"
                  className="overflow-hidden rounded-xl object-cover object-center"
                  height="400"
                  src="/about.svg"
                  width="700"
                  loading="lazy"
                />
              </div>

              <div className="grid gap-4 max-w-prose p-9 ">
                <div className="space-y-2">
                  <h2 className="text-2xl font-bold tracking-tighter sm:text-4xl dark:text-gray-100">
                    ABOUT US
                  </h2>
                </div>
                <p className="text-gray-500 md:text-lg/relaxed lg:text-base/relaxed xl:text-lg/relaxed dark:text-gray-400 px-12">
                  Discover local services effortlessly. Our platform simplifies
                  your search, offering personalized recommendations and
                  intuitive tools for seamless exploration. Experience
                  convenience like never before. Embark on effortless
                  exploration with our platform, designed to simplify your
                  search for local services. Whether it's dining, refueling, or
                  more, our personalized recommendations and intuitive tools
                  ensure convenience at every step of your journey. Start
                  discovering today!
                </p>
              </div>
            </div>
          </section>

          {/* how it work */}
          <section className="w-full py-12 md:py-24 lg:py-32  flex justify-center">
            <div className="container space-y-12 px-4 md:px-6">
              <div className="space-y-2 text-center">
                <div className="space-y-2 inline-block">
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl dark:text-gray-100">
                    How It Works
                  </h2>
                </div>
              </div>

              <div className="mx-auto grid max-w-sm items-start gap-8 sm:max-w-4xl sm:grid-cols-2 md:gap-12 lg:max-w-5xl lg:grid-cols-4">
                <div className="flex flex-col items-center justify-center space-y-2">
                  <div className="rounded-full mb-3 p-5 text-green-400 bg-green-200">
                    <h1>{<CgSearchFound size="2.2em" />}</h1>
                  </div>
                  <div className="space-y-2 text-center">
                    <h3 className="text-xl font-bold">Search a Service </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Enter your desired service and location to begin
                    </p>
                  </div>
                </div>
                <div className="flex flex-col items-center justify-center space-y-2">
                  <div className="rounded-full mb-3 p-5 text-violet-400 bg-violet-200">
                    <h1>{<RiRoadMapFill size="2.2em" />}</h1>
                  </div>
                  <div className="space-y-2 text-center">
                    <h3 className="text-xl font-bold">Explore Services </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Explore tailored suggestions and nearby options.
                    </p>
                  </div>
                </div>
                <div className="flex flex-col items-center justify-center space-y-2">
                  <div className="rounded-full mb-3 p-5 text-orange-400 bg-orange-200 ">
                    <h1>{<MdOutlineMiscellaneousServices size="2.2em" />}</h1>
                  </div>
                  <div className="space-y-2 text-center">
                    <h3 className="text-xl  font-bold">Select a Service</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Choose the service that meets your needs.
                    </p>
                  </div>
                </div>
                <div className="flex flex-col items-center justify-center space-y-2">
                  <div className="rounded-full mb-3 p-5 text-indigo-400 bg-indigo-200">
                    <h1>{<MdExplore size="2.2em" />}</h1>
                  </div>
                  <div className="space-y-2 text-center">
                    <h3 className="text-xl  font-bold">Navigate the Service</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Access directions or contact details for seamless
                      interaction.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* contact us section start here */}
          <section className="w-full flex justify-center">
            <div className="container px-4 py-5 md:px-6">
              <h2 className="text-2xl font-bold text-center mb-10 uppercase tracking-wide2 sm:text-4xl dark:text-gray-100">
                Contact US
              </h2>
              <div className="flex gap-6 justify-center lg:grid-cols-[1fr_500px] lg:gap-12 xl:grid-cols-[1fr_550px]">
                <div className="flex flex-col justify-center space-y-4 ">
                  <div className="space-y-2 min-[320px]:text-center min-[700px]:text-left">
                    <h2 className="text-3xl ml-1 font-bold tracking-tighter sm:text-4xl">
                      We'd love to hear from you.
                    </h2>
                    <p className="max-w-[600px] ml-2 text-gray-500 md:text-xl/relaxed lg:text-base/relaxed dark:text-gray-400">
                      Let us know how we can help. Fill out the form below and
                      we'll get back to you as soon as possible.
                    </p>
                  </div>
                  <div className="mt-6 flex max-w-md gap-x-4 px-2">
                    <label htmlFor="email-address" className="sr-only">
                      Email address
                    </label>
                    <input
                      id="email-address"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      className="min-w-0 flex-auto rounded-lg border w-[20rem] bg-white/5 px-3.5 py-2 text-gray-400 shadow-sm focus:outline-purple-400 sm:text-sm sm:leading-6"
                      placeholder="Enter your email"
                    />
                    <Button type="submit">
                      <a href="mailto:info@geoguide.com">Contact</a>
                    </Button>
                  </div>
                </div>

                <div className="hidden h-[20rem] w-[25rem] lg:block">
                  <img
                    alt="Image"
                    style={{ mixBlendMode: "unset" }}
                    className="mx-auto overflow-hidden w-[10px] rounded-xl min-[320px]:w-full"
                    loading="lazy"
                    src="/contact.svg"
                    width="50"
                  />
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
