import { Refine } from "@pankod/refine";
import routerProvider from "@pankod/refine-react-router";
import dataProvider from "@pankod/refine-simple-rest";

import { PostList } from "./pages/posts/list";
import { PostShow} from "./pages/posts/show";
import { PostEdit} from "./pages/posts/edit";
import { PostCreate} from "./pages/posts/create";
import "@pankod/refine/dist/styles.min.css";

const App: React.FC = () => {
    return (
        <Refine
            routerProvider={routerProvider}
            dataProvider={dataProvider("https://api.fake-rest.refine.dev")}
            resources={[{ name: "posts", list: PostList, show: PostShow, edit: PostEdit, create: PostCreate, canDelete: true}]}
        />
    );
};

export default App;
