import React from 'react';
import { Button, Icon } from 'antd';
import { Typography, Divider } from 'antd';
import './style.less';

const ButtonGroup = Button.Group;
const { Paragraph } = Typography;

export default class ButtonExample extends React.Component {

    render() {
        return <>
            <Paragraph>
                按钮有四种类型：主按钮、次按钮、虚线按钮和链接按钮。
            </Paragraph>
            <div>
                <Button type="primary">Primary</Button>
                <Button>Default</Button>
                <Button type="dashed">Dashed</Button>
                <Button type="danger">Danger</Button>
                <Button type="link">Link</Button>
            </div>
            <Divider></Divider>
            <Paragraph>
                图标按钮
            </Paragraph>
            <div>
            <Button type="primary" shape="circle" icon="search" />
            <Button type="primary" shape="circle">
            A
            </Button>
            <Button type="primary" icon="search">
            Search
            </Button>
            <Button shape="circle" icon="search" />
            <Button icon="search">Search</Button>
            <Button type="dashed" shape="circle" icon="search" />
            <Button type="dashed" icon="search">
            Search
            </Button>
            </div>

            <Divider></Divider>
            <Paragraph>
                图标按钮形状
            </Paragraph>
            <Button type="primary" icon="download" />
            <Button type="primary" shape="circle" icon="download" />
            <Button type="primary" shape="round" icon="download" />
            <Button type="primary" shape="round" icon="download">
            Download
            </Button>
            <Button type="primary" icon="download" >
            Download
            </Button>

            <Divider></Divider>
            <Paragraph>
                加载效果
            </Paragraph>
            <Button type="primary" loading>
                Loading
            </Button>
            <Button type="primary" loading />
            <Button type="primary" shape="circle" loading />
            <Button type="danger" shape="round" loading />

            <Divider></Divider>
            <Paragraph>
                按钮组合
            </Paragraph>
            <div>
            <ButtonGroup>
            <Button>Cancel</Button>
            <Button>OK</Button>
            </ButtonGroup>
            <ButtonGroup style={{margin: '0 1em'}}>
            <Button disabled>L</Button>
            <Button disabled>M</Button>
            <Button disabled>R</Button>
            </ButtonGroup>
            <ButtonGroup>
            <Button type="primary">
                <Icon type="left" />
                Go back
            </Button>
            <Button type="primary">
                Go forward
                <Icon type="right" />
            </Button>
            </ButtonGroup>
            </div>

            <Divider></Divider>
            <Paragraph>
                按钮不可用
            </Paragraph>
            <div>
                <Button type="primary" disabled>
                    Primary(disabled)
                </Button>
                <Button type="dashed" disabled>
                    Dashed(disabled)
                </Button>
                <Button type="danger" disabled>Danger</Button>
                <Button type="link" danger disabled>
                    Danger Link(disabled)
                </Button>
            </div>
            <div>
                <div className="site-button-ghost-wrapper">
                    <Button ghost>Ghost</Button>
                    <Button ghost disabled>
                        Ghost(disabled)
                </Button>
                </div>
            </div>

            <Divider></Divider>
            <Paragraph>
                按钮宽度适合父元素
            </Paragraph>
            <div>
                <Button type="primary" block>
                Primary
                </Button>
                <Button block>Default</Button>
                <Button type="dashed" block>
                Dashed
                </Button>
                <Button type="danger" block>
                Danger
                </Button>
                <Button type="link" block>
                Link
                </Button>
            </div>

        </>;
    }
}