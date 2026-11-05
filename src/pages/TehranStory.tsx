import { SceneConsequences } from '@/components/story/SceneConsequences'
import { SceneEvidence } from '@/components/story/SceneEvidence'
import { SceneFromSpace } from '@/components/story/SceneFromSpace'
import { SceneGroundwater } from '@/components/story/SceneGroundwater'
import { SceneMechanism } from '@/components/story/SceneMechanism'
import { SceneOpening } from '@/components/story/SceneOpening'
import { SceneResponse } from '@/components/story/SceneResponse'
import { StoryProvider } from '@/components/story/StoryProvider'
import { StoryRail } from '@/components/story/StoryRail'

/**
 * "The Story of Land Subsidence in Tehran" — seven animated chapters.
 *
 * The chapters are separate, self-contained components; everything they share
 * (the global pause/replay clock and the progress rail) is provided here so the
 * rail can govern every scene from one control.
 */
export function TehranStory() {
  return (
    <StoryProvider>
      <div className="relative bg-void">
        <SceneOpening />
        <StoryRail />
        <SceneGroundwater />
        <SceneMechanism />
        <SceneConsequences />
        <SceneFromSpace />
        <SceneEvidence />
        <SceneResponse />
      </div>
    </StoryProvider>
  )
}
