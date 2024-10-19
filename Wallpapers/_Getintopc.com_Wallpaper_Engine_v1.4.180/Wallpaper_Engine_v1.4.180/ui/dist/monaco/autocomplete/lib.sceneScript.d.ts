/// <reference no-default-lib="true"/>

/**
 * A vector with 2 dimensions.
 * https://wallpaper-engine.fandom.com/wiki/SceneScript_Class_Vec2
 */
class Vec2 {
	x: Number;
	y: Number;
	
	constructor(x: Number|Vec3|String, y?: Number, z?: Number): Vec2;
	
	/**
	 * The length.
	 */
	length(): Number;
	
	/**
	 * The length squared (more efficient for simple comparisons in your code).
	 */
	lengthSqr(): Number;
	
	/**
	 * Normalizes the length.
	 */
	normalize(): Vec2;
	
	/**
	 * Makes a simple copy of the vector.
	 */
	copy(): Vec2;
	
	/**
	 * Adds another vector or number.
	 */
	add(value: Number|Vec2): Vec2;
	
	/**
	 * Subtracts another vector or number.
	 */
	subtract(value: Number|Vec2): Vec2;
	
	/**
	 * Multiplies with another vector or number.
	 */
	multiply(value: Number|Vec2): Vec2;
	
	/**
	 * Divides by another vector or number.
	 */
	divide(value: Number|Vec2): Vec2;
	
	/**
	 * Returns perpendicular direction.
	 */
	perpendicular(): Vec2;
	
	/**
	 * Computes dot product with value.
	 */
	dot(value: Vec2): Number;
	
	/**
	 * Reflects along given normal.
	 */
	reflect(normal: Vec2): Vec2;
	
	/**
	 * Converts components to a string representation that Wallpaper Engine understands.
	 */
	toString(): String;
}

/**
 * A vector with 3 dimensions.
 * https://wallpaper-engine.fandom.com/wiki/SceneScript_Class_Vec3
 */
class Vec3 {
	x: Number;
	y: Number;
	z: Number;
	
	constructor(x: Number|Vec2|String, y?: Number, z?: Number): Vec3;
	
	/**
	 * The length.
	 */
	length(): Number;
	
	/**
	 * The length squared (more efficient for simple comparisons in your code).
	 */
	lengthSqr(): Number;
	
	/**
	 * Normalizes the length.
	 */
	normalize(): Vec3;
	
	/**
	 * Makes a simple copy of the vector.
	 */
	copy(): Vec3;
	
	/**
	 * Adds another vector or number.
	 */
	add(value: Number|Vec3): Vec3;
	
	/**
	 * Subtracts another vector or number.
	 */
	subtract(value: Number|Vec3): Vec3;
	
	/**
	 * Multiplies with another vector or number.
	 */
	multiply(value: Number|Vec3): Vec3;
	
	/**
	 * Divides by another vector or number.
	 */
	divide(value: Number|Vec3): Vec3;
	
	/**
	 * Computes cross product with value.
	 */
	cross(value: Vec3): Vec3;
	
	/**
	 * Computes dot product with value.
	 */
	dot(value: Vec3): Number;
	
	/**
	 * Reflects along given normal.
	 */
	reflect(normal: Vec3): Vec3;
	
	/**
	 * Converts components to a string representation that Wallpaper Engine understands.
	 */
	toString(): String;
}

/**
 * A 4x4 matrix.
 */
class Mat4 {
	m: Array;
	
	/**
	 * Creates an identity matrix.
	 */
	constructor(): Mat4;
	
	/**
	 * Gets or sets the translation of the matrix.
	 */
	translation(position?: Vec2|Vec3): Vec3;

	/**
	 * Converts components to a string representation that Wallpaper Engine understands.
	 */
	toString(): String;
}

/**
 * A vector with 4 dimensions.
 */
class Vec4 {
	x: Number;
	y: Number;
	z: Number;
	w: Number;
}

/**
 * A vector with 4 dimensions.
 * https://wallpaper-engine.fandom.com/wiki/SceneScript_Class_CameraTransforms
 */
interface CameraTransforms {
	eye: Vec3;
	center: Vec3;
	up: Vec3;
	zoom: Number;
}

/**
 * An animation event fired by puppet or property animations
 */
interface AnimationEvent {
	name: String;
	frame: Number;
}

/**
 * Event used for all cursor related callbacks.
 * https://wallpaper-engine.fandom.com/wiki/SceneScript_Class_ICursorEvent
 */
interface ICursorEvent {
	/**
	 * 2D position on screen in pixels. NOT USED.
	 */
	//screenPosition: Vec2;
	 
	/**
	 * 3D Position of the cursor in world space. Only X and Y are supported right now.
	 */
	worldPosition: Vec3
	
	/**
	 * 3D position local to the object. Only X and Y are supported right now.
	 */
	localPosition: Vec3;
	
	/**
	 * Currently always 0 for left mouse button. NOT USED.
	 */
	// button: Number;
}

/**
 * Math utilities.
 * https://wallpaper-engine.fandom.com/wiki/SceneScript_Module_WEMath
 */
declare module 'WEMath' {
	/**
	 * Remaps value between min and max into [0, 1] range.
	 */
	export function smoothStep(min: Number, max: Number, value: Number): Number;
	/**
	 * Interpolates from a to b based on value.
	 */
	export function mix(a: Number, b: Number, value: Number): Number;
	/**
	 * Factor to conver degrees to radians.
	 */
	export let deg2rad: Number;
	/**
	 * Factor to conver radians to degrees.
	 */
	export let rad2deg: Number;
}

/**
 * Linear algebra utilities.
 * https://wallpaper-engine.fandom.com/wiki/SceneScript_Module_WEVector
 */
declare module 'WEVector' {
	/**
	 * Create a 2D directional vector from an angle (degrees).
	 */
	export function angleVector2(angle: Number): Vec2;
	/**
	 * Create an angle (degrees) matching a 2D directional vector.
	 */
	export function vectorAngle2(direction: Vec2): Number;
}

/**
 * Color utilities.
 * https://wallpaper-engine.fandom.com/wiki/SceneScript_Module_WEColor
 */
declare module 'WEColor' {
	/**
	 * Converts a normalized RGB vector to a normalized HSV vector.
	 */
	export function rgb2hsv(rgb: Vec3): Vec3;
	
	/**
	 * Converts a normalized HSV vector to a normalized RGB vector.
	 */
	export function hsv2rgb(hsv: Vec3): Vec3;
	
	/**
	 * Normalizes a color vector from 0..255 to 0..1.
	 */
	export function normalizeColor(rgb: Vec3): Vec3;
	
	/**
	 * Expends a color vector from 0..1 to 0..255.
	 */
	export function expandColor(rgb: Vec3): Vec3;
}

/**
 * Audio buffers for audio response. All buffers have the same length.
 * https://wallpaper-engine.fandom.com/wiki/SceneScript_Class_IAudioBuffers
 */
interface IAudioBuffers {
	left: Float32Array;
	right: Float32Array;
	average: Float32Array;
}

/**
 * Material that includes shader property access and textures.
 * https://wallpaper-engine.fandom.com/wiki/SceneScript_Class_IMaterial
 */
interface IMaterial {
	
}

/**
 * Effect layer on an image.
 * https://wallpaper-engine.fandom.com/wiki/SceneScript_Class_IEffect
 */
interface IEffect {
	/**
	 * Gets materials associated with this effect.
	 */
	getMaterial(index: Number): IMaterial;
	
	/**
	 * Get number of materials used by this effect.
	 */
	getMaterialCount(): Number;
	
	/**
	 * Whether is currently visible.
	 */
	visible: Boolean;
	
	/**
	 * Custom name entered in editor.
	 */
	name: String;
}

/**
 * A generic property animation.
 */
interface ITextureAnimation {
	/**
	 * Returns the number of frames of the entire animation.
	 */
	readonly frameCount: Number;

	/**
	 * The duration of the animation.
	 */
	readonly duration: Number;
	
	/**
	 * Speed factor of the texture animation.
	 */
	rate: Number;
	
	/**
	 * Whether or not this animation should loop.
	 */
	//loop: Boolean;

	/**
	 * Start playing the animation if it's paused or stopped.
	 */
	play(): void;

	/**
	 * Pause the animation.
	 */
	pause(): void;

	/**
	 * Stop the animation and reset the current time to zero.
	 */
	stop(): void;

	/**
	 * Checks if the animation is currently playing.
	 */
	isPlaying(): Boolean;

	/**
	 * Returns the current frame of the animation.
	 */
	getFrame(): Number;

	/**
	 * Changes the frame that is currently displayed, works with paused and running animations.
	 */
	setFrame(frame: Number): void;

	/**
	 * Re-joins the animation with the shared animation timer of all materials using this texture.
	 */
	join(): void;
}

/**
 * The Animation layer object for puppet animations.
 */
interface IAnimationLayer {
	/**
	 * The framerate of the animation.
	 */
	readonly fps: Number;

	/**
	 * Returns the number of frames of the entire animation.
	 */
	readonly frameCount: Number;

	/**
	 * The duration of the animation.
	 */
	readonly duration: Number;

	/**
	 * The custom name of the animation.
	 */
	name: String;

	/**
	 * The speed of the animation.
	 */
	rate: Number;

	/**
	 * The blend amount of the animation.
	 */
	blend: Number;

	/**
	 * Whether the animation layer is currently visible.
	 */
	visible: Boolean;

	/**
	 * Start playing the animation if it's paused or stopped.
	 */
	play(): void;

	/**
	 * Pause the animation.
	 */
	pause(): void;

	/**
	 * Stop the animation and reset the current time to zero.
	 */
	stop(): void;

	/**
	 * Checks if the animation is currently playing.
	 */
	isPlaying(): Boolean;

	/**
	 * Returns the current frame of the animation.
	 */
	getFrame(): Number;

	/**
	 * Changes the frame that is currently displayed.
	 */
	setFrame(frame: Number): void;
}

/**
 * Properties only available on sound objects
 * https://wallpaper-engine.fandom.com/wiki/SceneScript_Class_ISoundLayer
 */
interface ISoundLayer {
	/**
	 * Check if we're playing any sound.
	 */
	isPlaying(): Boolean;
	
	/**
	 * Play or resume playing.
	 */
	play(): void;
	
	/**
	 * Stop all sounds.
	 */
	stop(): void;
	
	/**
	 * Pause all sounds.
	 */
	pause(): void;
	
	/**
	 * Adjust volume.
	 */
	volume: Number;
}

/**
 * Properties only available on image/text layer objects
 * https://wallpaper-engine.fandom.com/wiki/SceneScript_Class_IImageLayer
 */
interface IEffectLayer {
	/**
	 * Find a material effect by its name or index.
	 */
	getEffect(name: String|Number): IEffect;
	
	/**
	 * Get number of effects used by this image layer.
	 */
	getEffectCount(): Number
	
	/**
	 * Resolution of the image layer in pixels. Only read this, do not write.
	 */
	readonly size: Vec2;
	
	perspective: Boolean;
	
	solid: Boolean;
}

/**
 * Properties only available on text layer objects
 * https://wallpaper-engine.fandom.com/wiki/SceneScript_Class_ITextLayer
 */
interface ITextLayer {
	/**
	 * The text that will be displayed.
	 */
	text: String;
	
	/**
	 * Text color.
	 */
	color: Vec3;
	
	/**
	 * The opacity.
	 */
	alpha: Number;
	
	/**
	 * Enables the text background.
	 */
	opaquebackground: Boolean;
	
	/**
	 * Sets the background color.
	 */
	backgroundcolor: Vec3;
	
	/**
	 * Size of the font in points for 300 DPI.
	 */
	pointsize: Number;
	
	/**
	 * Font path.
	 */
	font: String;
	
	/**
	 * Padding in pixels.
	 */
	padding: Number;
	
	/**
	 * Horizontal text alignment: left, center, right.
	 */
	horizontalalign: String;
	
	/**
	 * Vertical text alignment: center, top, bottom.
	 */
	verticalalign: String;
	
	/**
	 * Dynamic screen anchor: none, center, top, topright, right
	 * bottomright, bottom, bottomleft, left, topleft.
	 */
	anchor: String;
}

/**
 * Instance properties that allow particles to be different per layer.
 * https://wallpaper-engine.fandom.com/wiki/SceneScript_Class_IParticleSystemInstance
 */
interface IParticleSystemInstance {
	/**
	 * Opacity of the particle system.
	 */
	alpha: Number;
	
	/**
	 * Size multipler of the particle system.
	 */
	size: Number;
	
	/**
	 * Multiplier of particle being emitted.
	 */
	count: Number;
	
	/**
	 * Velocity multipler of all particles.
	 */
	speed: Number;
	
	/**
	 * Multipler for lifetime of particles.
	 */
	lifetime: Number;
	
	/**
	 * Playback rate simulation and emission.
	 */
	rate: Number;
	
	/**
	 * Normalized color value to adjust particles by.
	 */
	colorn: Number;
	
	/**
	 * Position of control point 0.
	 */
	controlpoint0: Vec3;
	
	/**
	 * Position of control point 1.
	 */
	controlpoint1: Vec3;
	
	/**
	 * Position of control point 2.
	 */
	controlpoint2: Vec3;
	
	/**
	 * Position of control point 3.
	 */
	controlpoint3: Vec3;
	
	/**
	 * Position of control point 4.
	 */
	controlpoint4: Vec3;
	
	/**
	 * Position of control point 5.
	 */
	controlpoint5: Vec3;
	
	/**
	 * Position of control point 6.
	 */
	controlpoint6: Vec3;
	
	/**
	 * Position of control point 7.
	 */
	controlpoint7: Vec3;
}

/**
 * Properties only available for particle systems.
 * https://wallpaper-engine.fandom.com/wiki/SceneScript_Class_IParticleSystem
 */
interface IParticleSystem {
	/**
	 * If the particle has stopped, this will restart the emission and start simulating again.
	 */
	play(): void;
	
	/**
	 * This will stop emitting new particles but the existing ones will continue to simulate and render.
	 */
	pause(): void;
	
	/**
	 * This will remove all particles immediately and stop emitting new ones.
	 */
	stop(): void;
	
	/**
	 * Check if the particle is emitting anything right now or any particles are being simulated.
	 */
	isPlaying(): Boolean;
	
	/**
	 * Access to instance properties.
	 */
	instance: IParticleSystemInstance;
}

/**
 * Properties only available on image layer objects and solids.
 * https://wallpaper-engine.fandom.com/wiki/SceneScript_Class_IImageLayer
 */
interface IImageLayer {
	/**
	 * Opacity of the layer.
	 */
	alpha: Number;
	
	/**
	 * Image color.
	 */
	color: Vec3;

	/**
	 * Image alignment (center, top, right, bottom, left, topright etc).
	 */
	alignment: String;
	
	/**
	 * Gets the texture animation if the albedo texture of this image layer is a sprite sheet/GIF.
	 */
	getTextureAnimation(): ITextureAnimation;

	/**
	 * Get the number of animation layers currently used on this layer.
	 */
	getAnimationLayerCount(): Number;

	/**
	 * Get an existing animation layer object by name or index.
	 */
	getAnimationLayer(name: String|Number): IAnimationLayer;

	/**
	 * Create a new animation layer by animation name or JSON config.
	 */
	createAnimationLayer(animation: String|Object): IAnimationLayer;

	/**
	 * Remove an existing animation layer by name, index or IAnimationLayer object reference.
	 */
	destroyAnimationLayer(animationLayer: String|Object|IAnimationLayer): Boolean;

	/**
	 * Get the number of skeletal bones.
	 */
	getBoneCount(): Number;

	/**
	 * Get world bone transform by name or index.
	 */
	getBoneTransform(bone: String|Number): Mat4;

	/**
	 * Set world bone transform by name or index.
	 */
	setBoneTransform(bone: String|Number, transform: Mat4): void;

	/**
	 * Get the index of a bone by name.
	 */
	getBoneIndex(name: String): Number;

	/**
	 * Get the index of a bone by name.
	 */
	getBoneParentIndex(child: Number|String): Number;

	/**
	 * Apply directional or angular impulse to a physics bone.
	 */
	applyBonePhysicsImpulse(bone?: String|Number, directionalImpulse: Vec3, angularImpulse: Vec3): void;

	/**
	 * Resets physics forces and position.
	 */
	resetBonePhysicsSimulation(bone?: String|Number): void;
}

/**
 * Includes common properties for each layer and specific functions that will only work on a particular type of layer.
 */
interface ILayer extends IImageLayer, ISoundLayer, IEffectLayer, ITextLayer, IParticleSystem {
	/**
	 * Position of the layer.
	 */
	origin: Vec3;
	/**
	 * Orientation of the layer in euler angles and degrees.
	 */
	angles: Vec3;
	/**
	 * Scale of the layer.
	 */
	scale: Vec3;
	
	parallaxDepth: Vec2;
	name: String;
	
	/**
	 * Visibility currently only for image layers and particles.
	 */
	visible: Boolean;
	
	/**
	 * Get an animation object by name. Leave empty to get the animation object bound to the current property.
	 */
	getAnimation(name?: String): IAnimation;
}

/**
 * Reference to layer this script runs on.
 * https://wallpaper-engine.fandom.com/wiki/SceneScript_Class_ILayer
 */
declare let thisLayer: ILayer;

/**
 * Controls the entire scene and provides access to layers.
 */
interface IScene {
	/**
	 * Find a specific layer by its editor name or index.
	 */
	getLayer(name: String|Number): ILayer;
	
	/**
	 * Get current number of layers.
	 */
	getLayerCount(): Number;
	  
	/**
	 * Lists all layers in an array.
	 */
	enumerateLayers(): [ILayer];
	  
	/**
	 * Remove a layer by name, index or object. The layer is removed after all scripts on that frame updated.
	 */
	destroyLayer(layer: String|Number|ILayer): Boolean;
	
	/**
	 * Creates a new layer. Make sure to register the required asset in IEngine or it won't be pushed to Workshop when publishing.
	 * Also keep in mind that you should delete these layers again if you are done using them, they won't delete themselves and may reduce performance.
	 */
	createLayer(configuration: String|Object|IAssetHandle): ILayer;
	
	/**
	 * Sort layer differently by inserting it at a new index.
	 */
	sortLayer(layer: String|Number|ILayer, index: Number): Boolean;
	
	/**
	 * Sort layer differently by inserting it at a new index.
	 */
	getLayerIndex(layer: String|ILayer): Number;
	
	/**
	 * Get the initial configuration of an existing layer.
	 */
	getInitialLayerConfig(layer: String|Number|ILayer): Object;
	
	/**
	 * Get current static scene camera transforms.
	 */
	getCameraTransforms(): CameraTransforms;
	
	/**
	 * Set current static scene camera transforms.
	 */
	setCameraTransforms(cameraTransforms: CameraTransforms): void;
	
	  
	bloom: Boolean;
	bloomstrength: Number;
	bloomthreshold: Number;

	clearenabled: Boolean;
	clearcolor: Vec3;

	ambientcolor: Vec3;
	skylightcolor: Vec3;
	
	fov: Number;
	nearz: Number;
	farz: Number;
	
	camerafade: Boolean;
	
	camerashake: Boolean;
	camerashakespeed: Number;
	camerashakeamplitude: Number;
	camerashakeroughness: Number;
	
	cameraparallax: Boolean;
	cameraparallaxamount: Number;
	cameraparallaxdelay: Number;
	cameraparallaxmouseinfluence: Number;
}

/**
 * Reference to the currently active scene.
 * https://wallpaper-engine.fandom.com/wiki/SceneScript_Class_IScene
 */
declare let thisScene: IScene;

/**
 * Global console interface to log messages.
 */
interface IConsole {
	/**
	 * Logs an info message.
	 */
	log(...name: any): void;
	  
	/**
	 * Logs an error message.
	 */
	error(...name: any): void;
}

/**
 * Reference to the global console.
 * https://wallpaper-engine.fandom.com/wiki/SceneScript_Class_IConsole
 */
declare let console: IConsole;

/**
 * Global context interface to access render state.
 */
interface IRenderContext {
}

/**
 * Reference to the global context.
 */
declare let renderContext: IRenderContext;

/**
 * Global interface to access input devices.
 */
interface IInput {
	/**
	 * Position of the cursor in world space. Only x and y are supported right now.
	 */
	cursorWorldPosition: Vec3;
	
	/**
	 * Position of the cursor on the screen in pixels.
	 */
	cursorScreenPosition: Vec2;
	
	/**
	 * Whether left cursor button is down.
	 */
	cursorLeftDown: Boolean;
}

/**
 * Reference to global input object.
 * https://wallpaper-engine.fandom.com/wiki/SceneScript_Class_IInput
 */
declare let input: IInput;

/**
 * Global system interface for generic commands.
 */
interface IEngine {
	/**
	 * Check if the script is running in the editor.
	 */
	isRunningInEditor(): Boolean;
	
	/**
	 * Register this script for listening to audio buffers. Must be called from the global context in a script.
	 * @param resolution  Must be either 16, 32 or 64. Defines the size of the buffer per channel.
	 */
	registerAudioBuffers(resolution: Number): IAudioBuffers;
	
	/**
	 * Mark an asset as used so it will get packed up for Workshop.
	 */
	registerAsset(file: String): IAssetHandle;
	
	/**
	 * Starts a timeout callback in milliseconds. Returns a new callback that can be used to stop the timeout prematurely.
	 */
	setTimeout(callback: Function, delay?: Number): Function;
	
	/**
	 * Starts a repeating interval callback in milliseconds. Returns a new callback that can be used to stop the interval.
	 */
	setInterval(callback: Function, delay?: Number): Function;
	
	/**
	 * Screen resolution in pixels.
	 */
	screenResolution: Vec2;
	
	/**
	 * Size of the canvas/full wallpaper in pixels (2D scenes only).
	 */
	canvasSize: Vec2;
	
	/**
	 * Current user properties.
	 */
	userProperties: Object;
	
	/**
	 * 24h clock in range [0, 1].
	 */
	timeOfDay: Number;
	
	/**
	 * Last frametime in seconds. May be zero when the frame needs to be re-drawn without animating.
	 */
	frametime: Number;
	
	/**
	 * Time the scene has been running.
	 */
	runtime: Number;
}

/**
 * Reference to the global system.
 * https://wallpaper-engine.fandom.com/wiki/SceneScript_Class_IEngine
 */
declare let engine: IEngine;

/**
 * A generic property animation.
 */
interface IAnimation {
	/**
	 * The framerate of the animation.
	 */
	readonly fps: Number;

	/**
	 * Returns the number of frames of the entire animation.
	 */
	readonly frameCount: Number;

	/**
	 * The duration of the animation.
	 */
	readonly duration: Number;

	/**
	 * The custom name of the animation.
	 */
	readonly name: String;
	
	/**
	 * Speed factor of the texture animation.
	 */
	rate: Number;

	/**
	 * Start playing the animation if it's paused or stopped.
	 */
	play(): void;

	/**
	 * Pause the animation.
	 */
	pause(): void;

	/**
	 * Stop the animation and reset the current time to zero.
	 */
	stop(): void;

	/**
	 * Checks if the animation is currently playing.
	 */
	isPlaying(): Boolean;

	/**
	 * Returns the current frame of the animation.
	 */
	getFrame(): Number;

	/**
	 * Changes the frame that is currently displayed.
	 */
	setFrame(frame: Number): void;
}

/**
 * The object this property is bound to.
 */
interface IThisPropertyObjectBase {
	/**
	 * Get an animation object by name. Leave empty to get the animation object bound to the current property.
	 */
	getAnimation(name?: String): IAnimation;
}
