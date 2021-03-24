import HomeIcon from "@material-ui/icons/Home";
import BarChartIcon from "@material-ui/icons/BarChart";
import PublishIcon from "@material-ui/icons/Publish";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";

const items = [
  {
    name: "home",
    label: "Home",
    icon: <HomeIcon />,
    isActive: false,
    showLabel: true,
    redirect: "/",
    selected: true,
  },
  {
    name: "data",
    label: "Data",
    icon: <PublishIcon />,
    // arrow: <ExpandMoreIcon />,
    isActive: false,
    showLabel: true,
    redirect: "/data",
    selected: false,
    // items: [
    // {
    //   name: "configure",
    //   label: "Configure",
    //  redirect: "/data",
    //   selected: false,
    //},
    // {
    //   name: "create_new_columns",
    //  label: "Create Columns",
    //  redirect: "/create_columns",
    //    selected: false,
    // },
    // ],
  },
  {
    name: "data_explorer",
    label: "Data Explorer",
    icon: <BarChartIcon />,
    // arrow: <ExpandMoreIcon />,
    isActive: false,
    showLabel: true,
    redirect: "/data_explorer",
    selected: false,
    // items: [
    //  {
    //   name: "advanced_analytics",
    //  label: "Advanced Analytics",
    //  redirect: "/draggable",
    //  selected: false,
    // // },
    // ],
  },
];

export default items;
