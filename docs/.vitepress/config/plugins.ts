import path, {resolve} from 'path'
import fs from 'fs'
// @ts-ignore
import MarkdownIt from 'markdown-it'
// @ts-ignore
import mdContainer from 'markdown-it-container'
// @ts-ignore
import type Token from 'markdown-it/lib/token'
import {highlight} from '../utils/highlight'
import { docRoot } from './global';
const localMd = MarkdownIt()

interface ContainerOpts {
    marker?: string | undefined

    validate?(params: string): boolean

    render?(
        tokens: Token[],
        index: number,
    ): string
}

export const mdPlugin = (md: MarkdownIt) => {
    /**
     * @desc 自定义容器
     * Params:
     * name - container name (mandatory) 容器名称
     * options:
     *   validate - optional, function to validate tail after opening marker, should return true on success.
     *   render - optional, renderer function for opening/closing tokens.
     *   marker - optional (:), character to use in delimiter.
     */

    md.use(mdContainer, 'demo', {
        validate(params) {
            return !!params.trim().match(/^demo\s*(.*)$/)
        },
        render (tokens, idx) {
            const m = tokens[idx].info.trim().match(/^demo\s+(.*)$/);
            if (tokens[idx].nesting === 1) {
                /* means the tag is opening */
                const description = m && m.length > 1 ? m[1] : '';
                const sourceFileToken = tokens[idx + 2];
                let source = '';
                // demo文件名称
                const sourceFile = sourceFileToken.children?.[0].content ?? ''
                if (sourceFileToken.type === 'inline') {
                    // 读取示列代码文件
                    source = fs.readFileSync(
                        path.resolve(docRoot, 'examples', `${sourceFile}.vue`),
                        'utf-8'
                    )
                }
                if (!source) throw new Error(`Incorrect source file: ${sourceFile}`)
                // opening tag
                return `<Demo
                        source="${encodeURIComponent(highlight(source, 'js'))}"
                        path="${sourceFile}"
                        raw-source="${encodeURIComponent(source)}"
                        description="${encodeURIComponent(localMd.render(description))}">`
            } else {
                // closing tag
                return '</Demo>\n';
            }
        },
    } as ContainerOpts)
}
