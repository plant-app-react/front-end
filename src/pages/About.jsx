import { FaLinkedinIn } from "react-icons/fa";
import { BiLogoGithub } from "react-icons/bi";


function About() {
    return (
        <section>
            <h3 className="text-center text-xl my-16 text-green-700">PlantiePie was designed and created by Full Stack Developers: </h3>

            <div className="flex gap-24 justify-center">
                <div>
                    <img className="rounded-full h-48 mb-12" src="https://media.licdn.com/dms/image/C4E03AQHWM-0AK6BNJw/profile-displayphoto-shrink_800_800/0/1664211497110?e=1715817600&v=beta&t=8gzDn-I2LJ4IKDfc3hCx_mKqbFPKoYyxqtXPKnpoi_U" alt="" />
                    <h4 className="text-3xl text-green-700 font-bold">Lucía Marconi</h4>
                    <div className="flex gap-8 mt-8 justify-center text-4xl">
                        <a href="https://www.linkedin.com/in/lumarconi21/" target="blank"><FaLinkedinIn className=" text-blue-700" /></a>
                        <a href="https://www.github.com/lumarconi21/" target="blank"><BiLogoGithub /></a>
                    </div>

                </div>
                <div>
                    <h4 className="text-3xl text-green-700 font-semibold">Amparo Cabezuelo</h4>
                    <div className="flex gap-8 mt-8 justify-center text-4xl">
                        <FaLinkedinIn className=" text-blue-700" />
                        <BiLogoGithub />
                    </div>
                </div>
            </div>
        </section>
    )
}

export default About