import Container from "./container";
import React from "react";

const Testimonials  = () => {
  return (
    <Container>
      <div className="grid gap-10 lg:grid-cols-2 xl:grid-cols-3 px-8 tablet:px-2">
        <div className="lg:col-span-2 xl:col-auto">
          <div className="flex flex-col justify-between w-full h-full bg-gray-200 px-14 rounded-2xl py-14 dark:bg-trueGray-800">
            <p className="text-2xl leading-normal ">
            I have been using the HRMS application for my organization for the past six months, and I must say it has been a game-changer for our HR department. The level of automation and ease of use it offers have made our HR processes more efficient than ever before.
            </p>

            <Avatar
              image='https://randomuser.me/api/portraits/women/3.jpg'
              name="Sarah Steiner"
              title="VP Sales at Google"
            />
          </div>
        </div>
        <div className="">
          <div className="flex flex-col justify-between w-full h-full bg-gray-200 px-14 rounded-2xl py-14 dark:bg-trueGray-800">
            <p className="text-2xl leading-normal ">
              With this HRMS, managing employee data and leave requests is a breeze. The self-service feature is a huge time-saver, and the integration options work seamlessly with our existing systems.
            </p>

            <Avatar
              image='https://randomuser.me/api/portraits/women/4.jpg'
              name="Dylan Ambrose"
              title="Lead marketer at Netflix"
            />
          </div>
        </div>
        <div className="">
          <div className="flex flex-col justify-between w-full h-full bg-gray-200 px-14 rounded-2xl py-14 dark:bg-trueGray-800">
            <p className="text-2xl leading-normal ">
              We love the robust security measures in the HRMS. Our sensitive employee data is well-protected, and we trust the system to comply with data protection regulations.
            </p>

            <Avatar
              image='https://randomuser.me/api/portraits/women/3.jpg'
              name="Gabrielle Winn"
              title="Co-founder of Acme Inc"
            />
          </div>
        </div>
      </div>
    </Container>
  );
}

function Avatar(props) {
  return (
    <div className="flex items-center mt-8 space-x-3">
      <div className="flex-shrink-0 overflow-hidden rounded-full w-14 h-14">
        <img
          src={props.image}
          width="40"
          height="40"
          alt="Avatar"
          placeholder="blur"
        />
      </div>
      <div>
        <div className="text-lg font-medium">{props.name}</div>
        <div className="text-gray-600 dark:text-gray-400">{props.title}</div>
      </div>
    </div>
  );
}

export default Testimonials;