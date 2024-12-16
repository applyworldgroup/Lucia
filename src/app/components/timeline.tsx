// "use client";// import React from "react";// import { motion } from "framer-motion";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import {
//   Tooltip,
//   TooltipContent,
//   TooltipProvider,
//   TooltipTrigger,
// } from "@/components/ui/tooltip";
// import { AlertCircle, CheckCircle2, Clock, Info, XCircle } from "lucide-react";

// // Status Configuration
// const STATUS_CONFIG = {
//   pending: {
//     color: "text-yellow-500",
//     defaultIcon: Clock,
//     bgColor: "bg-yellow-50",
//   },
//   completed: {
//     color: "text-green-500",
//     defaultIcon: CheckCircle2,
//     bgColor: "bg-green-50",
//   },
//   failed: {
//     color: "text-red-500",
//     defaultIcon: XCircle,
//     bgColor: "bg-red-50",
//   },
//   info: {
//     color: "text-blue-500",
//     defaultIcon: Info,
//     bgColor: "bg-blue-50",
//   },
//   warning: {
//     color: "text-orange-500",
//     defaultIcon: AlertCircle,
//     bgColor: "bg-orange-50",
//   },
// };

// // Timeline Item Props
// interface TimelineItemProps {
//   title: string;
//   description: string;
//   timestamp: string;
//   status?: keyof typeof STATUS_CONFIG;
//   extra?: string;
//   icon?: React.ReactNode; // New prop for custom icon
// }

// // Timeline Item Component
// const TimelineItem: React.FC<TimelineItemProps> = ({
//   title,
//   description,
//   timestamp,
//   status = "pending",
//   extra,
//   icon, // Add icon prop
// }) => {
//   const { color, defaultIcon: DefaultIcon, bgColor } = STATUS_CONFIG[status];

//   // Determine which icon to use
//   const IconToRender = icon || <DefaultIcon className="h-5 w-5" />;

//   return (
//     <TooltipProvider>
//       <motion.div
//         initial={{ opacity: 0, x: -20 }}
//         animate={{ opacity: 1, x: 0 }}
//         transition={{ duration: 0.5 }}
//         className={`relative pb-8 last:pb-0 group`}
//       >
//         {/* Connector Line */}
//         <div
//           className={`absolute top-4 left-4 -ml-px h-full w-0.5 ${bgColor}`}
//           aria-hidden="true"
//         />

//         <Tooltip>
//           <TooltipTrigger asChild>
//             <div className="relative flex items-start space-x-3">
//               {/* Status Icon */}
//               <div>
//                 <span
//                   className={`
//                     h-8 w-8 rounded-full flex items-center justify-center ring-8 ring-white
//                     ${color} ${bgColor}
//                   `}
//                 >
//                   {IconToRender}
//                 </span>
//               </div>

//               {/* Content Card */}
//               <Card className="flex-1 shadow-sm hover:shadow-md transition-shadow duration-300">
//                 <CardHeader>
//                   <div className="flex justify-between items-center">
//                     <CardTitle className={`text-sm font-semibold ${color}`}>
//                       {title}
//                     </CardTitle>
//                     <span className="text-xs text-muted-foreground ml-2">
//                       {timestamp}
//                     </span>
//                   </div>
//                 </CardHeader>
//                 <CardContent>
//                   <p className="text-sm text-muted-foreground">{description}</p>
//                   {extra && (
//                     <div className="mt-2 text-xs text-muted-foreground">
//                       {extra}
//                     </div>
//                   )}
//                 </CardContent>
//               </Card>
//             </div>
//           </TooltipTrigger>
//           <TooltipContent side="right">
//             <p>{description}</p>
//           </TooltipContent>
//         </Tooltip>
//       </motion.div>
//     </TooltipProvider>
//   );
// };

// // Timeline Component (unchanged)
// interface TimelineProps {
//   items: TimelineItemProps[];
// }

// const Timeline: React.FC<TimelineProps> = ({ items }) => {
//   return (
//     <div className="max-w-2xl mx-auto p-4">
//       {items.map((item, index) => (
//         <TimelineItem key={index} {...item} />
//       ))}
//     </div>
//   );
// };

// export { Timeline, TimelineItem };

"use client";

import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { AlertCircle, CheckCircle2, Clock, Info, XCircle } from "lucide-react";

// Status Configuration
const STATUS_CONFIG = {
  pending: {
    color: "text-yellow-500",
    defaultIcon: Clock,
    bgColor: "bg-yellow-50",
  },
  completed: {
    color: "text-green-500",
    defaultIcon: CheckCircle2,
    bgColor: "bg-green-50",
  },
  failed: {
    color: "text-red-500",
    defaultIcon: XCircle,
    bgColor: "bg-red-50",
  },
  info: {
    color: "text-blue-500",
    defaultIcon: Info,
    bgColor: "bg-blue-50",
  },
  warning: {
    color: "text-orange-500",
    defaultIcon: AlertCircle,
    bgColor: "bg-orange-50",
  },
};

// Timeline Item Props
interface TimelineItemProps {
  title: string;
  description: string;
  timestamp: string;
  status?: keyof typeof STATUS_CONFIG;
  extra?: string;
  icon?: React.ReactNode;
}

// Timeline Item Component
const TimelineItem: React.FC<TimelineItemProps> = ({
  title,
  description,
  timestamp,
  status = "pending",
  extra,
  icon,
}) => {
  const { color, defaultIcon: DefaultIcon, bgColor } = STATUS_CONFIG[status];

  // Determine which icon to use
  const IconToRender = icon || <DefaultIcon className="h-5 w-5" />;

  return (
    <TooltipProvider>
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className={`relative pb-8 last:pb-0 group flex items-start`} // Added flex and items-start
      >
        {/* Connector Line - Adjusted positioning */}
        <div
          className={`absolute  left-4 -ml-px h-full w-0.5 ${bgColor}`}
          aria-hidden="true"
        />

        {/* Icon Container - Positioned absolutely and centered */}
        <div className="absolute top-0 left-0 w-8 h-full flex items-center justify-center">
          <span
            className={`
              h-8 w-8 rounded-full flex items-center justify-center ring-8 ring-white
              ${color} ${bgColor} z-10
            `}
          >
            {IconToRender}
          </span>
        </div>

        <Tooltip>
          <TooltipTrigger asChild>
            <div className="relative flex-1 ml-10">
              {" "}
              {/* Added ml-10 to make space for icon */}
              {/* Content Card */}
              <Card className="shadow-sm hover:shadow-md transition-shadow duration-300">
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle className={`text-sm font-semibold ${color}`}>
                      {title}
                    </CardTitle>
                    <span className="text-xs text-muted-foreground ml-2">
                      {timestamp}
                    </span>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{description}</p>
                  {extra && (
                    <div className="mt-2 text-xs text-muted-foreground">
                      {extra}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </TooltipTrigger>
          <TooltipContent side="right">
            <p>{description}</p>
          </TooltipContent>
        </Tooltip>
      </motion.div>
    </TooltipProvider>
  );
};

// Timeline Component
interface TimelineProps {
  items: TimelineItemProps[];
}

const Timeline: React.FC<TimelineProps> = ({ items }) => {
  return (
    <div className="max-w-2xl mx-auto p-4 pl-4">
      {" "}
      {/* Added left padding */}
      {items.map((item, index) => (
        <TimelineItem key={index} {...item} />
      ))}
    </div>
  );
};

export { Timeline, TimelineItem };
