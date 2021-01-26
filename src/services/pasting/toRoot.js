import {buildTagsLevels} from "../tagsLevels";
import {getTagByFingerprint} from "../tagsFingerprint";
import {getInitiationStrategy} from "../initiation/initiationFactory";
import {getComponentsStrategy} from "../../components/componentsFactory";

export const toRoot = (objTextTags, originalTextSplitted, translatedTextSplitted, tags, settings) => {
    let tagsLevels = buildTagsLevels(objTextTags, tags);
    let tagsLevel = tagsLevels.length - 1;
    let initiationStrategy = getInitiationStrategy(settings.initiationMethod);
    while (tagsLevel > 0) {
        tagsLevels[tagsLevel].forEach((tagHash) => {
            //let tag = getTagByFingerprint(tagHash);
            //initiationStrategy(tag, originalTextSplitted, translatedTextSplitted);
        });
        tagsLevel--;
    }
    let componentStrategy = getComponentsStrategy(settings.initiationMethod);
    if (componentStrategy) {
        componentStrategy();
    }
}