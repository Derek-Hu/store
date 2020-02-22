import React from 'react';
import { Button, Icon } from 'antd';
import { Typography, Divider } from 'antd';
import './style.less';
import DragContainer from 'src/components/ElementContainer';

const ButtonGroup = Button.Group;
const { Paragraph } = Typography;
const {NoDragElement } = DragContainer;

export default class ButtonExample extends React.Component {

    render() {
        return <>
            <Paragraph>
                按钮有四种类型：主按钮、次按钮、虚线按钮和链接按钮。
            </Paragraph>
            <DragContainer>
                <Button>Default</Button>
                <Button type="dashed">Dashed</Button>
                {/* <NoDragElement> */}
                    <Button type="primary">Primary</Button>
                {/* </NoDragElement> */}
                <Button type="danger">Danger</Button>
                <Button type="link">Link</Button>
            </DragContainer>
            <Divider></Divider>
            <Paragraph>
                图标按钮
            </Paragraph>
            <DragContainer>
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
            </DragContainer>

            <Divider></Divider>
            <Paragraph>
                图标按钮形状
            </Paragraph>
            <DragContainer>
                <Button type="primary" icon="download" />
                <Button type="primary" shape="circle" icon="download" />
                <Button type="primary" shape="round" icon="download" />
                <Button type="primary" shape="round" icon="download">
                    Download
                </Button>
                <Button type="primary" icon="download" >
                    Download
                </Button>
            </DragContainer>

            <Divider></Divider>
            <Paragraph>
                加载效果
            </Paragraph>
            <DragContainer>
                <Button type="primary" loading>
                    Loading
                </Button>
                <Button type="primary" loading />
                <Button type="primary" shape="circle" loading />
                <Button type="danger" shape="round" loading />
            </DragContainer>

            <Divider></Divider>
            <Paragraph>
                按钮组合
            </Paragraph>
            <DragContainer>
                <ButtonGroup>
                    <Button>Cancel</Button>
                    <Button>OK</Button>
                </ButtonGroup>
                <ButtonGroup style={{ margin: '0 1em' }}>
                    <Button>L</Button>
                    <Button>M</Button>
                    <Button>R</Button>
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
            </DragContainer>

            <Divider></Divider>
            <Paragraph>
                按钮不可用
            </Paragraph>
            <DragContainer>
                <Button type="primary" disabled>
                    Primary(disabled)
                </Button>
                <Button type="dashed" disabled>
                    Dashed(disabled)
                </Button>
                <Button type="danger" disabled>Danger</Button>
                <Button type="link" disabled>
                    Danger Link(disabled)
                </Button>
            </DragContainer>
            <div className="site-button-ghost-wrapper">
                <DragContainer>
                    <Button ghost>Ghost</Button>
                    <Button ghost disabled>
                        Ghost(disabled)
                        </Button>
                </DragContainer>
            </div>

            <Divider></Divider>
            <Paragraph>
                按钮宽度适合父元素
            </Paragraph>
            <DragContainer>
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
            </DragContainer>
        </>;
    }
}