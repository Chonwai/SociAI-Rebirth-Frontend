import React, { memo } from 'react';
import { NextPage } from 'next';

export const withLayout = (
    WrapperComponent: React.FunctionComponent | NextPage,
    Layout: React.FunctionComponent<any>
) => {
    const Component = memo((props: any) => (
        <Layout>
            <WrapperComponent {...props} />
        </Layout>
    ));

    Component.displayName = `withLayout(${WrapperComponent.displayName})`;

    return Component;
};
