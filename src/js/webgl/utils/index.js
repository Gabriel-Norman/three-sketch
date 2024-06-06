import { WebGLRenderTarget } from 'three';

export function getDoubleRenderTarget(width, height, options) {
    const renderTarget = {
        read: new WebGLRenderTarget(width, height, options),
        write: new WebGLRenderTarget(width, height, options),
        swap: () => {
            const temp = renderTarget.read;
            renderTarget.read = renderTarget.write;
            renderTarget.write = temp;
        },
        setSize: (width, height) => {
            renderTarget.read.setSize(width, height);
            renderTarget.write.setSize(width, height);
        },
        dispose: () => {
            renderTarget.read.dispose();
            renderTarget.write.dispose();
        }
    };

    return renderTarget;
}