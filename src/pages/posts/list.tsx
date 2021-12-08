// import {
//   List,
//   TextField,
//   TagField,
//   DateField,
//   Table,
//   useTable,
//   useMany,
//   FilterDropdown,
//   Select,
//   useSelect,
//   ShowButton,
// } from "@pankod/refine";

// import { IPost, ICategory } from "interfaces";

// export const PostList: React.FC = () => {
//   // useTable hooks fetches data from api
//   // passing the useTable hook as a spread operator onto Table component from antdesign
//   const { tableProps } = useTable<IPost>();
//   const categoryIds =
//     tableProps?.dataSource?.map((item) => item.category.id) ?? [];
//   // useMany hook use for joining/ relationship
//   const { data: categoriesData, isLoading } = useMany<ICategory>({
//     resource: "categories",
//     ids: categoryIds,
//     queryOptions: {
//       enabled: categoryIds.length > 0,
//     },
//   });
//   //  useSelect hook populates props for <Select> component from a given resource
//   const { selectProps: categorySelectProps } = useSelect<ICategory>({
//     resource: "categories",
//   });
//   return (
//     <List>
//       <Table {...tableProps} rowKey="id">
//         {/* Table.Column used for mapping and formatting the data */}
//         <Table.Column dataIndex="title" title="title" />
//         <Table.Column
//           dataIndex="status"
//           title="status"
//           render={(value) => <TagField value={value} />}
//         />
//         <Table.Column
//           dataIndex="createdAt"
//           title="createdAt"
//           render={(value) => <DateField format="LLL" value={value} />}
//         />
//         <Table.Column
//           dataIndex={["category", "id"]}
//           title="category"
//           render={(value) => {
//             if (isLoading) {
//               return <TextField value="Loading..." />;
//             }

//             return (
//               <TextField
//                 value={
//                   categoriesData?.data.find((item) => item.id === value)?.title
//                 }
//               />
//             );
//           }}
//           // serves as a bridge between its child input and refine's useTable hook
//           // passes childs input value to useTable using filterDropdown's embedded props and provides a filter button
//           filterDropdown={(props) => (
//             <FilterDropdown {...props}>
//               <Select
//                 style={{ minWidth: 200 }}
//                 mode="multiple"
//                 placeholder="Select Category"
//                 {...categorySelectProps}
//               />
//             </FilterDropdown>
//           )}
//         />
//         <Table.Column<IPost>
//           title="Actions"
//           dataIndex="actions"
//           render={(_text, record): React.ReactNode => {
//             return (
//               <ShowButton size="small" recordItemId={record.id} hideText />
//             );
//           }}
//         />
//       </Table>
//     </List>
//   );
// };

import {
    List,
    TextField,
    TagField,
    DateField,
    Table,
    useTable,
    useMany,
    FilterDropdown,
    Select,
    ShowButton,
    useSelect,
    Space,
    EditButton,
    DeleteButton
} from "@pankod/refine";

import { IPost, ICategory } from "interfaces";

export const PostList: React.FC = () => {
    const { tableProps } = useTable<IPost>();

    const categoryIds =
        tableProps?.dataSource?.map((item) => item.category.id) ?? [];
    const { data: categoriesData, isLoading } = useMany<ICategory>({
        resource: "categories",
        ids: categoryIds,
        queryOptions: {
            enabled: categoryIds.length > 0,
        },
    });

    const { selectProps: categorySelectProps } = useSelect<ICategory>({
        resource: "categories",
    });

    return (
        <List>
            <Table {...tableProps} rowKey="id">
                <Table.Column dataIndex="title" title="title" />
                <Table.Column
                    dataIndex="status"
                    title="status"
                    render={(value) => <TagField value={value} />}
                />
                <Table.Column
                    dataIndex="createdAt"
                    title="createdAt"
                    render={(value) => <DateField format="LLL" value={value} />}
                />
                <Table.Column
                    dataIndex={["category", "id"]}
                    title="category"
                    render={(value) => {
                        if (isLoading) {
                            return <TextField value="Loading..." />;
                        }

                        return (
                            <TextField
                                value={
                                    categoriesData?.data.find(
                                        (item) => item.id === value,
                                    )?.title
                                }
                            />
                        );
                    }}
                    filterDropdown={(props) => (
                        <FilterDropdown {...props}>
                            <Select
                                style={{ minWidth: 200 }}
                                mode="multiple"
                                placeholder="Select Category"
                                {...categorySelectProps}
                            />
                        </FilterDropdown>
                    )}
                />
                <Table.Column<IPost>
                    title="Actions"
                    dataIndex="actions"
                    render={(_text, record): React.ReactNode => {
                        return (
                            <Space>
                                <ShowButton
                                    size="small"
                                    recordItemId={record.id}
                                    hideText
                                />
                                <EditButton
                                    size="small"
                                    recordItemId={record.id}
                                    hideText
                                />
                                   <DeleteButton
                                    size="small"
                                    recordItemId={record.id}
                                    hideText
                                />
                            </Space>
                        );
                    }}
                />
            </Table>
        </List>
    );
};