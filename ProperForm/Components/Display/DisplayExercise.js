import React, {useState, useCallback, useRef} from "react";
import {
	Text,
	View,
	TouchableOpacity,
	Button,
	Image,
	ScrollView
} from "react-native";
import {
	views,
	button,
	image,
	logstyle,
	exerciseStyle
} from "./../Screens/Styles";
import YoutubePlayer from "react-native-youtube-iframe";
// <YoutubePlayer
// 							height={200}
// 							width={300}
// 							style={{marginLeft: 15}}
// 							play={playing}
// 							videoId={"ykJmrZ5v0Oo"}
// 							onChangeState={onStateChange}
// />

function DisplayExercise({val}) {
	const [playing, setPlaying] = useState(false);

	const onStateChange = useCallback(state => {
		if (state === "ended") {
			//setPlaying(false);
			Alert.alert("video has finished playing!");
		}
	}, []);

	const togglePlaying = useCallback(() => {
		setPlaying(prev => !prev);
	}, []);

	switch (val) {
		case 1:
			//CURL EXERCISE============================================
			return (
				<View style={views.Home}>
					<Image
						source={require("./../../img/curl.png")}
						style={image.TouchableA}
					/>
					<View style={views.Home}>
						
					</View>
					<ScrollView>
						<View style={exerciseStyle.wrapPara}>
							<Text style={exerciseStyle.title}>
							Total sets = 4, Rep range: 15, 12, 10, 8
							</Text>
							<Text style={exerciseStyle.title}>
							Total time duration for this exercise: 7 minutes
							</Text>
							<Text style={exerciseStyle.title}>
							Rest pause between each set: 30-40 seconds
							</Text>
							<Text style={exerciseStyle.title}>
								{""}
								A weight training exercise intended to develop
								the biceps brachii’s size, endurance or
								strength, in which a dumbbell or similar
								weighted object is held in the hand with the arm
								extended and lifted to complete flexion of the
								arm at the elbow or, when developing both biceps
								brachii, using a barbell to perform the same
								movement with both arms.
							</Text>
						</View>
					</ScrollView>
				</View>
			);
			break;
		case 2:
			//HAMMER CURL EXERCISE============================================
			return (
				<View style={views.Home}>
					<Image
						source={require("./../../img/hammer_curl.png")}
						style={image.Touchable}
					/>
					<YoutubePlayer
						height={200}
						width={300}
						play={playing}
						videoId={"CFBZ4jN1CMI"}
						onChangeState={onStateChange}
					/>
					<ScrollView>
						<View style={exerciseStyle.wrapPara}>
						<Text style={exerciseStyle.title}>
							Total sets = 4, Rep range: 15, 12, 10, 8
							</Text>
							<Text style={exerciseStyle.title}>
							Total time duration for this exercise: 7 minutes
							</Text>
							<Text style={exerciseStyle.title}>
							Rest pause between each set: 30-40 seconds
							</Text>
							<Text style={exerciseStyle.title}>
							{""}
								The Hammer Curl is a quintessential
								weightlifting exercise that targets the biceps
								and forearms. The exercise is performed with
								dumbbells, and it strengthens the three largest
								muscles along the front of your upper arms.
							</Text>
						</View>
					</ScrollView>
				</View>
			);
			break;
		case 3:
			//SKULL CRUSHER EXERCISE============================================
			return (
				<View style={views.Home}>
					<Image
						source={require("./../../img/skull_crusher.png")}
						style={image.Touchable}
					/>
					<YoutubePlayer
						height={200}
						width={300}
						play={playing}
						videoId={"d_KZxkY_0cM"}
						onChangeState={onStateChange}
					/>
					<ScrollView>
						<View style={exerciseStyle.wrapPara}>
							<Text style={exerciseStyle.title}>
							Total sets = 3, Rep range: 15, 12, 10
							</Text>
							<Text style={exerciseStyle.title}>
							Total time duration for this exercise: 6 minutes
							</Text>
							<Text style={exerciseStyle.title}>
							Rest pause between each set: 30-40 seconds
							</Text>
							<Text style={exerciseStyle.title}>
								{""}
								Lying triceps extensions, also known as skull
								crushers and French extensions or French
								presses, are a strength exercise used in many
								different forms of strength training. It works
								the triceps from the elbow all the way to the
								latissimus dorsi.
							</Text>
						</View>
					</ScrollView>
				</View>
			);
			break;
		case 4:
			//Overhead Extention EXERCISE============================================
			return (
				<View style={views.Home}>
					<Image
						source={require("./../../img/overhead.png")}
						style={image.Touchable}
					/>
					<YoutubePlayer
						height={200}
						width={300}
						play={playing}
						videoId={"X-iV-cG8cYs"}
						onChangeState={onStateChange}
					/>
					<ScrollView>
						<View style={exerciseStyle.wrapPara}>
						<Text style={exerciseStyle.title}>
							Total sets = 3, Rep range: 12, 10, 8
							</Text>
							<Text style={exerciseStyle.title}>
							Total time duration for this exercise: 6 minutes
							</Text>
							<Text style={exerciseStyle.title}>
							Rest pause between each set: 30-40 seconds
							</Text>
							<Text style={exerciseStyle.title}>
							{""}
							The overhead triceps extension is a strength
							move that targets the back of your upper arm,
							where your triceps brachii muscles are located.
							The three heads of the triceps muscles all come
							together to help extend the elbow, so it's a
							really effective move.
							</Text>
						</View>
					</ScrollView>
				</View>
			);
			break;
		case 5:
			//TRICEP DIP EXERCISE============================================
			return (
				<View style={views.Home}>
					<Image
						source={require("./../../img/dips.png")}
						style={image.Touchable}
					/>
					<YoutubePlayer
						height={200}
						width={300}
						play={playing}
						videoId={"BjiyWC_cJW0"}
						onChangeState={onStateChange}
					/>
					<ScrollView>
						<View style={exerciseStyle.wrapPara}>
						<Text style={exerciseStyle.title}>
							Total sets = 4, Rep range: 20-15 reps
							</Text>
							<Text style={exerciseStyle.title}>
							Total time duration for this exercise: 8 minutes
							</Text>
							<Text style={exerciseStyle.title}>
							Rest pause between each set: 40 seconds
							</Text>
							<Text style={exerciseStyle.title}>
							{""}
								Contract your core and take your full body
								weight onto your arms, bending your knees so
								your feet are off the ground. Bend your elbows
								and lower your body slowly. Begin by lowering
								for two seconds or as low as you can go without
								great discomfort in your shoulders. Pause in the
								low position for a second or two.
							</Text>
						</View>
					</ScrollView>
				</View>
			);
			break;
		case 6:
			//REVERSE CURL EXERCISE============================================
			return (
				<View style={views.Home}>
					<Image
						source={require("./../../img/revcurl.png")}
						style={image.Touchable}
					/>
					<YoutubePlayer
						height={200}
						width={300}
						play={playing}
						videoId={"nRgxYX2Ve9w"}
						onChangeState={onStateChange}
					/>
					<ScrollView>
						<View style={exerciseStyle.wrapPara}>
						<Text style={exerciseStyle.title}>
							Total sets = 3, Rep range: 15, 12, 10
							</Text>
							<Text style={exerciseStyle.title}>
							Total time duration for this exercise: 6 minutes
							</Text>
							<Text style={exerciseStyle.title}>
							Rest pause between each set: 30-40 seconds
							</Text>
							<Text style={exerciseStyle.title}>
							{""}
								Reverse curls are bicep contraction but your
								palm facing downward. Unlike, bicep curls where
								you hold the barbell or dumbbell with your palms
								facing towards you. ... The primary target
								muscles of reverse curls are the biceps brachii
								and brachialis.
							</Text>
						</View>
					</ScrollView>
				</View>
			);
			break;
		case 7:
			//CRUNCH EXERCISE============================================
			return (
				<View style={views.Home}>
					<Image
						source={require("./../../img/crunch.png")}
						style={image.Touchable}
					/>
					<YoutubePlayer
						height={200}
						width={300}
						play={playing}
						videoId={"GWIEON0VSaY"}
						onChangeState={onStateChange}
					/>
					<ScrollView>
						<View style={exerciseStyle.wrapPara}>
						<Text style={exerciseStyle.title}>
							Total sets = 3, Rep range: 1 minute X 3
							</Text>
							<Text style={exerciseStyle.title}>
							Total time duration for this exercise: 6 minutes
							</Text>
							<Text style={exerciseStyle.title}>
							Rest pause between each set: 40-60 seconds
							</Text>
							<Text style={exerciseStyle.title}>
							{""}
								The crunch is a classic core exercise. It
								specifically trains your abdominal muscles,
								which are part of your core. Your core consists
								not only of your abs. It also includes your
								oblique muscles on the sides of your trunk, as
								well as the muscles in your pelvis, lower back,
								and hips.
							</Text>
						</View>
					</ScrollView>
				</View>
			);
			break;
		case 8:
			//PLANK EXERCISE============================================
			return (
				<View style={views.Home}>
					<Image
						source={require("./../../img/plank.png")}
						style={image.Touchable}
					/>
					<YoutubePlayer
						height={200}
						width={300}
						play={playing}
						videoId={"ASdvN_XEl_c"}
						onChangeState={onStateChange}
					/>
					<ScrollView>
						<View style={exerciseStyle.wrapPara}>
						<Text style={exerciseStyle.title}>
						Total sets = 2, Rep range: 1 minute X 2
						</Text>
						<Text style={exerciseStyle.title}>
						Total time duration for this exercise: 4 minutes
						</Text>
						<Text style={exerciseStyle.title}>
						Rest pause between each set: 30-40 seconds
						</Text>
						<Text style={exerciseStyle.title}>
						{""}
								The crunch is a classic core exercise. It
								specifically trains your abdominal muscles,
								which are part of your core. Your core consists
								not only of your abs. It also includes your
								oblique muscles on the sides of your trunk, as
								well as the muscles in your pelvis, lower back,
								and hips.
								The plank also called a front hold, hover, or
								abdominal bridge, is an isometric core strength
								exercise that involves maintaining a position
								similar to a push-up for the maximum possible
								time.
							</Text>
						</View>
					</ScrollView>
				</View>
			);
			break;
		case 9:
			//SEATED TWIST EXERCISE============================================
			return (
				<View style={views.Home}>
					<Image
						source={require("./../../img/seated_twist.png")}
						style={image.Touchable}
					/>
					<YoutubePlayer
						height={200}
						width={300}
						play={playing}
						videoId={"_cD9f078WQ4"}
						onChangeState={onStateChange}
					/>
					<ScrollView>
						<View style={exerciseStyle.wrapPara}>
						<Text style={exerciseStyle.title}>
						Total sets = 2, Rep range: 1 minute to 45 seconds X 2
						</Text>
						<Text style={exerciseStyle.title}>
						Total time duration for this exercise: 4 minutes
						</Text>
						<Text style={exerciseStyle.title}>
						Rest pause between each set: 30-40 seconds
						</Text>
						<Text style={exerciseStyle.title}>
						{""}
						Seated Spinal Twist is a restorative yoga pose
						that promotes good digestion and encourages
						spinal mobility. Twisting postures help tone the
						belly, massage internal organs and can help
						relieve lower back pain. Often performed towards
						the end of a sequence, this pose is
						simultaneously relaxing and invigorating.
						</Text>
						</View>
					</ScrollView>
				</View>
			);
			break;
		case 10:
			//BICYCLE CRUNCH EXERCISE============================================
			return (
				<View style={views.Home}>
					<Image
						source={require("./../../img/bic_crunch.png")}
						style={image.Touchable}
					/>
					<YoutubePlayer
						height={200}
						width={300}
						play={playing}
						videoId={"Iwyvozckjak"}
						onChangeState={onStateChange}
					/>
					<ScrollView>
						<View style={exerciseStyle.wrapPara}>
						<Text style={exerciseStyle.title}>
						Total sets = 2, Rep range: 1 minute to 45 seconds X 2
						</Text>
						<Text style={exerciseStyle.title}>
						Total time duration for this exercise: 4 minutes
						</Text>
						<Text style={exerciseStyle.title}>
						Rest pause between each set: 30-40 seconds
							</Text>
							<Text style={exerciseStyle.title}>
							{""}
								Seated Spinal Twist is a restorative yoga pose
								that promotes good digestion and encourages
								spinal mobility. Twisting postures help tone the
								belly, massage internal organs and can help
								relieve lower back pain. Often performed towards
								the end of a sequence, this pose is
								simultaneously relaxing and invigorating.
								Lift one leg just off the ground and extend it
								out. Lift the other leg and bend your knee
								towards your chest. As you do so twist through
								your core so the opposite arm comes towards the
								raised knee. You don't need to touch elbow to
								knee, instead focus on moving through your core
								as you turn your torso.
							</Text>
						</View>
					</ScrollView>
				</View>
			);
			break;
		case 11:
			//TUCK & CRUNCH EXERCISE============================================
			return (
				<View style={views.Home}>
					<Image
						source={require("./../../img/tuckcrunch.png")}
						style={image.Touchable}
					/>
					<YoutubePlayer
						height={200}
						width={300}
						play={playing}
						videoId={"Xbi6dVlys1w"}
						onChangeState={onStateChange}
					/>
					<ScrollView>
						<View style={exerciseStyle.wrapPara}>
						<Text style={exerciseStyle.title}>
						Total sets = 2, Rep range: 1 minute to 45 seconds X 2
						</Text>
						<Text style={exerciseStyle.title}>
						Total time duration for this exercise: 4 minutes
						</Text>
						<Text style={exerciseStyle.title}>
						Rest pause between each set: 30-40 seconds
							</Text>
							<Text style={exerciseStyle.title}>
							{""}
								To get the form right with the Tuck and Crunch,
								follow these simple steps. Lie down on an
								exercise mat on the floor or on the floor
								itself. ... Lift your arms off of the floor,
								then cross them over your chest. You're now in
								the starting position. Push your lower back into
								the floor and re-engage your abs.
							</Text>
						</View>
					</ScrollView>
				</View>
			);
			break;
		case 12:
			//RUSSIAN TWIST EXERCISE============================================
			return (
				<View style={views.Home}>
					<Image
						source={require("./../../img/russiantwist.png")}
						style={image.Touchable}
					/>
					<YoutubePlayer
						height={200}
						width={300}
						play={playing}
						videoId={"9V9csctSKj0"}
						onChangeState={onStateChange}
					/>
					<ScrollView>
						<View style={exerciseStyle.wrapPara}>
						<Text style={exerciseStyle.title}>
						Total sets = 2, Rep range: 1 minute to 45 seconds X 2
						</Text>
						<Text style={exerciseStyle.title}>
						Total time duration for this exercise: 4 minutes
						</Text>
						<Text style={exerciseStyle.title}>
						Rest pause between each set: 30-40 seconds
							</Text>
							<Text style={exerciseStyle.title}>
							{""}
								The Russian Twist is a popular core exercise
								that improves oblique strength and definition.
								The exercise, typically performed with a
								medicine ball, involves rotating your torso from
								side to side while holding a sit-up position
								with your feet off the ground. ... Holding a med
								ball or plate makes the movement more difficult.
							</Text>
						</View>
					</ScrollView>
				</View>
			);
			break;
		case 13:
			//CURTSY LUNGE EXERCISE============================================
			return (
				<View style={views.Home}>
					<Image
						source={require("./../../img/curtsy_lunge.png")}
						style={image.Touchable}
					/>
					<YoutubePlayer
						height={200}
						width={300}
						play={playing}
						videoId={"1MgFup8A_0c"}
						onChangeState={onStateChange}
					/>
					<ScrollView>
						<View style={exerciseStyle.wrapPara}>
						<Text style={exerciseStyle.title}>
						Total sets = 2, Rep range: 1 minute to 45 seconds X 2
						</Text>
						<Text style={exerciseStyle.title}>
						Total time duration for this exercise: 4 minutes
						</Text>
						<Text style={exerciseStyle.title}>
						Rest pause between each set: 30-40 seconds
							</Text>
							<Text style={exerciseStyle.title}>
							{""}
								The curtsy lunge targets the main muscles
								involved in a lunge — the quads and glutes — but
								also engages some additional movers. When your
								leg crosses back and around, the gluteus medius
								on the stationary leg fires up. The hip
								abductors — which bring your thighs together —
								are also engaged.
							</Text>
						</View>
					</ScrollView>
				</View>
			);
			break;
		case 14:
			//LUNGE EXERCISE============================================
			return (
				<View style={views.Home}>
					<Image
						source={require("./../../img/lunge.png")}
						style={image.Touchable}
					/>
					<YoutubePlayer
						height={200}
						width={300}
						play={playing}
						videoId={"QOVaHwm-Q6U"}
						onChangeState={onStateChange}
					/>
					<ScrollView>
						<View style={exerciseStyle.wrapPara}>
						<Text style={exerciseStyle.title}>
						Total sets = 3, Rep range: 12, 10, 10
						</Text>
						<Text style={exerciseStyle.title}>
						Total time duration for this exercise: 6 minutes
						</Text>
						<Text style={exerciseStyle.title}>
						Rest pause between each set: 30-40 seconds
							</Text>
							<Text style={exerciseStyle.title}>
								{" "}
								A lunge can refer to any position of the human
								body where one leg is positioned forward with
								knee bent and foot flat on the ground while the
								other leg is positioned behind. In contrast to
								the Split squat exercise, during the lunge the
								rear leg is also activated.
							</Text>
						</View>
					</ScrollView>
				</View>
			);
			break;
		case 15:
			//REVERSE LUNGE EXERCISE============================================
			return (
				<View style={views.Home}>
					<Image
						source={require("./../../img/reverse_lunge.png")}
						style={image.Touchable}
					/>
					<YoutubePlayer
						height={200}
						width={300}
						play={playing}
						videoId={"7pkeQFzJR9g"}
						onChangeState={onStateChange}
					/>
					<ScrollView>
						<View style={exerciseStyle.wrapPara}>
						<Text style={exerciseStyle.title}>
						Total sets = 3, Rep range: 12, 10, 10
						</Text>
						<Text style={exerciseStyle.title}>
						Total time duration for this exercise: 6 minutes
						</Text>
						<Text style={exerciseStyle.title}>
						Rest pause between each set: 30-40 seconds
							</Text>
							<Text style={exerciseStyle.title}>
								{" "}
								With a reverse lunge, you'll be stepping
								backward with one of your legs, says Tamir. You
								bend your back leg so your back knee will nearly
								touch the ground, and your front knee so your
								thigh is about parallel to the ground. Your
								front, planted leg is the one that will be
								working.
							</Text>
						</View>
					</ScrollView>
				</View>
			);
			break;
		case 16:
			//SQUAtS EXERCISE============================================
			return (
				<View style={views.Home}>
					<Image
						source={require("./../../img/squats.png")}
						style={image.Touchable}
					/>
					<YoutubePlayer
						height={200}
						width={300}
						play={playing}
						videoId={"xqvCmoLULNY"}
						onChangeState={onStateChange}
					/>
					<ScrollView>
						<View style={exerciseStyle.wrapPara}>
						<Text style={exerciseStyle.title}>
						Total sets = 4, Rep range: 12, 10, 8, 6
						</Text>
						<Text style={exerciseStyle.title}>
						Total time duration for this exercise: 10 minutes
						</Text>
						<Text style={exerciseStyle.title}>
						Rest pause between each set: 60-75 seconds
							</Text>
							<Text style={exerciseStyle.title}>
								{" "}
								A squat is a strength exercise in which the
								trainee lowers their hips from a standing
								position and then stands back up. During the
								descent of a squat, the hip and knee joints flex
								while the ankle joint dorsiflexes; conversely
								the hip and knee joints extend and the ankle
								joint plantarflexes when standing up.
							</Text>
						</View>
					</ScrollView>
				</View>
			);
			break;
		case 17:
			//SUMO SQUAtS EXERCISE============================================
			return (
				<View style={views.Home}>
					<Image
						source={require("./../../img/sumo_squat.png")}
						style={image.Touchable}
					/>
					<YoutubePlayer
						height={200}
						width={300}
						play={playing}
						videoId={"sqDGkIBYPAk"}
						onChangeState={onStateChange}
					/>
					<ScrollView>
						<View style={exerciseStyle.wrapPara}>
						<Text style={exerciseStyle.title}>
						Total sets = 4, Rep range: 12, 10, 8, 6
						</Text>
						<Text style={exerciseStyle.title}>
						Total time duration for this exercise: 10 minutes
						</Text>
						<Text style={exerciseStyle.title}>
						Rest pause between each set: 60-75 seconds
							</Text>
							<Text style={exerciseStyle.title}>
								{" "}
								The Sumo Squat is a lower-body strength exercise
								that's a variation of a standard squat. While
								all squats work the glutes, hip flexors, quads,
								hamstrings and calves, the leg positioning of
								the sumo squat works the inner thighs as well.
							</Text>
						</View>
					</ScrollView>
				</View>
			);
			break;
		case 18:
			//SHOULDER PRESS EXERCISE============================================
			return (
				<View style={views.Home}>
					<Image
						source={require("./../../img/shouldpress.png")}
						style={image.Touchable}
					/>
					<YoutubePlayer
						height={200}
						width={300}
						play={playing}
						videoId={"lfb3ffbrd4Q"}
						onChangeState={onStateChange}
					/>
					<ScrollView>
						<View style={exerciseStyle.wrapPara}>
						<Text style={exerciseStyle.title}>
						Total sets = 4, Rep range: 12, 10, 8, 6
						</Text>
						<Text style={exerciseStyle.title}>
						Total time duration for this exercise: 8 minutes
						<Text style={exerciseStyle.title}>
						</Text>
						Rest pause between each set: 45-60 seconds
							</Text>
							<Text style={exerciseStyle.title}>
								{" "}
								The Shoulder press is a weight training exercise
								with many variations, typically performed while
								standing, in which a weight is pressed straight
								upwards from racking position until the arms are
								locked out overhead, while the legs, lower back
								and abs maintain balance.
							</Text>
						</View>
					</ScrollView>
				</View>
			);
			break;
		case 19:
			//REVERSE FLY EXERCISE============================================
			return (
				<View style={views.Home}>
					<Image
						source={require("./../../img/reverse_fly.png")}
						style={image.Touchable}
					/>
					<YoutubePlayer
						height={200}
						width={300}
						play={playing}
						videoId={"buuYPLVXsJg"}
						onChangeState={onStateChange}
					/>
					<ScrollView>
						<View style={exerciseStyle.wrapPara}>
						<Text style={exerciseStyle.title}>
						Total sets = 3, Rep range: 12, 10, 8
						</Text>
						<Text style={exerciseStyle.title}>
						Total time duration for this exercise: 6 minutes
						</Text>
						<Text style={exerciseStyle.title}>
						Rest pause between each set: 30-45 seconds
							</Text>
							<Text style={exerciseStyle.title}>
								{" "}
								The reverse fly is an exercise you can do with
								dumbbells to target the muscles in the upper
								back. During a reverse fly, you work the
								rhomboid muscles in your upper back and shoulder
								region. Strong upper back muscles help balance
								your shoulder strength and help protect your
								shoulder from injury.
							</Text>
						</View>
					</ScrollView>
				</View>
			);
			break;
		case 20:
			//LATERAL PRESS EXERCISE============================================
			return (
				<View style={views.Home}>
					<Image
						source={require("./../../img/lateral_press.png")}
						style={image.Touchable}
					/>
					<YoutubePlayer
						height={200}
						width={300}
						play={playing}
						videoId={"WJm9zA2NY8E"}
						onChangeState={onStateChange}
					/>
					<ScrollView>
						<View style={exerciseStyle.wrapPara}>
						<Text style={exerciseStyle.title}>
						Total sets = 3, Rep range: 12, 10, 8
						</Text>
						<Text style={exerciseStyle.title}>
						Total time duration for this exercise: 6 minutes
						</Text>
						<Text style={exerciseStyle.title}>
						Rest pause between each set: 30-45 seconds
							</Text>
							<Text style={exerciseStyle.title}>
								{" "}
								Hinge at the hips and bend over until your torso
								is parallel to the floor, or close to that
								point, keeping your back straight. Let the
								dumbbells hang down beneath your chest. Raise
								the weights out to the sides until your arms are
								parallel with the ground, then slowly take them
								back down.
							</Text>
						</View>
					</ScrollView>
				</View>
			);
			break;
		case 21:
			//ARNOLD PRESS EXERCISE============================================
			return (
				<View style={views.Home}>
					<Image
						source={require("./../../img/arnold_press.png")}
						style={image.Touchable}
					/>
					<YoutubePlayer
						height={200}
						width={300}
						play={playing}
						videoId={"3VZGReJoRAM"}
						onChangeState={onStateChange}
					/>
					<ScrollView>
						<View style={exerciseStyle.wrapPara}>
						<Text style={exerciseStyle.title}>
						Total sets = 4, Rep range: 15, 12, 10, 8
						</Text>
						<Text style={exerciseStyle.title}>
						Total time duration for this exercise: 7 minutes
						</Text>
						<Text style={exerciseStyle.title}>
						Rest pause between each set: 30-40 seconds
							</Text>
							<Text style={exerciseStyle.title}>
								{" "}
								Hold a dumbbell in each hand with your arm bent,
								as in the top of a biceps curl, so your palms
								are facing you. Now, instead of pushing straight
								up, spread your arms to each side laterally,
								then press your arms up and twist your hands so
								your palms face forwards.
							</Text>
						</View>
					</ScrollView>
				</View>
			);
			break;
		case 22:
			//SHOULDER SHRUG EXERCISE============================================
			return (
				<View style={views.Home}>
					<Image
						source={require("./../../img/shrugs.png")}
						style={image.Touchable}
					/>
					<YoutubePlayer
						height={200}
						width={300}
						play={playing}
						videoId={"TVbilkxSAk"}
						onChangeState={onStateChange}
					/>
					<ScrollView>
						<View style={exerciseStyle.wrapPara}>
						<Text style={exerciseStyle.title}>
						Total sets = 3, Rep range: 15 X 3
						</Text>
						<Text style={exerciseStyle.title}>
						Total time duration for this exercise: 6 minutes
						</Text>
						<Text style={exerciseStyle.title}>
						Rest pause between each set: 30-45 seconds
							</Text>
							<Text style={exerciseStyle.title}>
								{" "}
								The main muscles that shoulder shrugs target are
								the trapezius muscles. These muscles are located
								on either side of your neck. They control the
								movement of your shoulder blades as well as your
								upper back and neck.
							</Text>
						</View>
					</ScrollView>
				</View>
			);
			break;
		case 23:
			//UPRIGHT ROW EXERCISE============================================
			return (
				<View style={views.Home}>
					<Image
						source={require("./../../img/uprightrow.png")}
						style={image.Touchable}
					/>
					<YoutubePlayer
						height={200}
						width={300}
						play={playing}
						videoId={"jaAV-rD45I0"}
						onChangeState={onStateChange}
					/>
					<ScrollView>
						<View style={exerciseStyle.wrapPara}>
						<Text style={exerciseStyle.title}>
						Total sets = 3, Rep range: 12, 10, 8
						</Text>
						<Text style={exerciseStyle.title}>
						Total time duration for this exercise: 6 minutes
						</Text>
						<Text style={exerciseStyle.title}>
						Rest pause between each set: 30-45 seconds
							</Text>
							<Text style={exerciseStyle.title}>
								{" "}
								The upright row is a weight training exercise
								performed by holding a weight with an overhand
								grip and lifting it straight up to the
								collarbone. This is a compound exercise that
								involves the trapezius, the deltoids and the
								biceps.
							</Text>
						</View>
					</ScrollView>
				</View>
			);
			break;
		case 24:
			//DEADLIFT EXERCISE============================================
			return (
				<View style={views.Home}>
					<Image
						source={require("./../../img/deadlift.png")}
						style={image.Touchable}
					/>
					<YoutubePlayer
						height={200}
						width={300}
						play={playing}
						videoId={"ytGaGIn3SjE"}
						onChangeState={onStateChange}
					/>
					<ScrollView>
						<View style={exerciseStyle.wrapPara}>
						<Text style={exerciseStyle.title}>
						Total sets = 4, Rep range: 12, 10, 8, 6
						</Text>
						<Text style={exerciseStyle.title}>
						Total time duration for this exercise: 8 minutes
						</Text>
						<Text style={exerciseStyle.title}>
						Rest pause between each set: 45 seconds
							</Text>
							<Text style={exerciseStyle.title}>
								{" "}
								The deadlift is a weight training exercise in
								which a loaded barbell or bar is lifted off the
								ground to the level of the hips, torso
								perpendicular to the floor, before being placed
								back on the ground. It is one of the three
								powerlifting exercises, along with the squat and
								bench press.
							</Text>
						</View>
					</ScrollView>
				</View>
			);
			break;
		case 25:
			//REVERSE ROW EXERCISE============================================
			return (
				<View style={views.Home}>
					<Image
						source={require("./../../img/reverse_row.png")}
						style={image.Touchable}
					/>
					<YoutubePlayer
						height={200}
						width={300}
						play={playing}
						videoId={"hXTc1mDnZCw"}
						onChangeState={onStateChange}
					/>
					<ScrollView>
						<View style={exerciseStyle.wrapPara}>
						<Text style={exerciseStyle.title}>
						Total sets = 4, Rep range: 12, 10, 8, 6
						</Text>
						<Text style={exerciseStyle.title}>
						Total time duration for this exercise: 8 minutes					
						</Text>
						<Text style={exerciseStyle.title}>
						Rest pause between each set: 45 seconds
							</Text>
							<Text style={exerciseStyle.title}>
								{" "}
								Contract your abs and butt, and keep your body a
								completely straight line. Your ears, shoulders,
								hips legs, and feet should all be in a straight
								line (like you're doing a plank). Pull yourself
								up to the bar until your chest touches the bar.
								Lower yourself back down with proper form.
							</Text>
						</View>
					</ScrollView>
				</View>
			);
			break;
		case 26:
			//REVERSE FLY EXERCISE============================================
			return (
				<View style={views.Home}>
					<Image
						source={require("./../../img/reverse_fly.png")}
						style={image.Touchable}
					/>
					<YoutubePlayer
						height={200}
						width={300}
						play={playing}
						videoId={"M4VWF1b-6Pc"}
						onChangeState={onStateChange}
					/>
					<ScrollView>
						<View style={exerciseStyle.wrapPara}>
						<Text style={exerciseStyle.title}>
						Total sets = 3, Rep range: 12, 10, 8
						</Text>
						<Text style={exerciseStyle.title}>
						Total time duration for this exercise: 6 minutes
						</Text>
						<Text style={exerciseStyle.title}>
						Rest pause between each set: 30-40 seconds
							</Text>
							<Text style={exerciseStyle.title}>
								{" "}
								The reverse fly is an exercise you can do with
								dumbbells to target the muscles in the upper
								back. During a reverse fly, you work the
								rhomboid muscles in your upper back and shoulder
								region. Strong upper back muscles help balance
								your shoulder strength and help protect your
								shoulder from injury.
							</Text>
						</View>
					</ScrollView>
				</View>
			);
			break;
		case 27:
			//DUMBBELL PULL-OVER EXERCISE============================================
			return (
				<View style={views.Home}>
					<Image
						source={require("./../../img/pullover.png")}
						style={image.Touchable}
					/>
					<YoutubePlayer
						height={200}
						width={300}
						play={playing}
						videoId={"5YStMv6m2g8"}
						onChangeState={onStateChange}
					/>
					<ScrollView>
						<View style={exerciseStyle.wrapPara}>
						<Text style={exerciseStyle.title}>
						Total sets = 3, Rep range: 12, 10, 8
						</Text>
						<Text style={exerciseStyle.title}>
						Total time duration for this exercise: 7 minutes
						</Text>
						<Text style={exerciseStyle.title}>
						Rest pause between each set: 45-60 seconds
							</Text>
							<Text style={exerciseStyle.title}>
								{" "}
								The classic dumbbell pullover is a widely used
								resistance exercise that primarily strengthens
								the muscles in the chest (pectoralis major) and
								the large wing-shaped muscles in the back
								(latissimus dorsi). By making variations to the
								movement, you can also engage the core muscles
								and the back of the upper arm (triceps).
							</Text>
						</View>
					</ScrollView>
				</View>
			);
			break;
		case 28:
			//SINGLE ARM ROW EXERCISE============================================
			return (
				<View style={views.Home}>
					<Image
						source={require("./../../img/singlearmrow.png")}
						style={image.Touchable}
					/>
					<YoutubePlayer
						height={200}
						width={300}
						play={playing}
						videoId={"roCP6wCXPqo"}
						onChangeState={onStateChange}
					/>
					<ScrollView>
						<View style={exerciseStyle.wrapPara}>
						<Text style={exerciseStyle.title}>
						Total sets = 3, Rep range: 12, 10, 8
						</Text>
						<Text style={exerciseStyle.title}>
						Total time duration for this exercise: 7 minutes
						</Text>
						<Text style={exerciseStyle.title}>
						Rest pause between each set: 45-60 seconds
							</Text>
							<Text style={exerciseStyle.title}>
								{" "}
								Single Arm Row is an upper body exercise that
								uses dumbbells to strengthen your upper back and
								shoulder. Many people end up in a hunch-back
								position with rounded shoulders due to a weak
								upper back. Keep strengthening these muscles and
								then practice keeping your shoulder blades
								pulled down away from your ears.
							</Text>
						</View>
					</ScrollView>
				</View>
			);
			break;
		case 29:
			//RENEGADE ROW EXERCISE============================================
			return (
				<View style={views.Home}>
					<Image
						source={require("./../../img/renegade.png")}
						style={image.Touchable}
					/>
					<YoutubePlayer
						height={200}
						width={300}
						play={playing}
						videoId={"4qEIChzM4ZA"}
						onChangeState={onStateChange}
					/>
					<ScrollView>
						<View style={exerciseStyle.wrapPara}>
						<Text style={exerciseStyle.title}>
						Total sets = 3, Rep range: 12, 10, 8
						</Text>
						<Text style={exerciseStyle.title}>
						Total time duration for this exercise: 7 minutes
						</Text>
						<Text style={exerciseStyle.title}>
						Rest pause between each set: 45-60 seconds
							</Text>
							<Text style={exerciseStyle.title}>
								{" "}
								The renegade row also known as a plank row, is
								almost a variation of the dumbbell row. You have
								to be able to hold a plank for the full duration
								of the exercise while alternating a dumbbell row
								with either arm. This means you must be able to
								hold your body in a plank position supported
								only by one arm at a time.
							</Text>
						</View>
					</ScrollView>
				</View>
			);
			break;
		case 30:
			//CHEST PRESS EXERCISE============================================
			return (
				<View style={views.Home}>
					<Image
						source={require("./../../img/chest_press.png")}
						style={image.Touchable}
					/>
					<YoutubePlayer
						height={200}
						width={300}
						play={playing}
						videoId={"vthMCtgVtFw"}
						onChangeState={onStateChange}
					/>
					<ScrollView>
						<View style={exerciseStyle.wrapPara}>
						<Text style={exerciseStyle.title}>
						Total sets = 4, Rep range: 12, 10, 10 , 8
						</Text>
						<Text style={exerciseStyle.title}>
						Total time duration for this exercise: 8 minutes
						</Text>
						<Text style={exerciseStyle.title}>
						Rest pause between each set: 60 seconds
							</Text>
							<Text style={exerciseStyle.title}>
								{" "}
								The seated chest press machine is an upright
								version of the standard lying bench press
								machine. The arms, placed under a weight-bearing
								load, are pushed away from the chest and
								returned to starting position. The chest press
								helps build the pectoral muscles as well as the
								biceps, deltoids, and latissimus dorsi muscles.
							</Text>
						</View>
					</ScrollView>
				</View>
			);
			break;
		case 31:
			//INCLINE PRESS EXERCISE============================================
			return (
				<View style={views.Home}>
					<Image
						source={require("./../../img/incline_press.png")}
						style={image.Touchable}
					/>
					<YoutubePlayer
						height={200}
						width={300}
						play={playing}
						videoId={"jPLdzuHckI8"}
						onChangeState={onStateChange}
					/>
					<ScrollView>
						<View style={exerciseStyle.wrapPara}>
						<Text style={exerciseStyle.title}>
						Total sets = 4, Rep range: 12, 10, 10, 8
						</Text>
						<Text style={exerciseStyle.title}>
						Total time duration for this exercise: 8 minutes
						</Text>
						<Text style={exerciseStyle.title}>
						Rest pause between each set: 60 seconds
							</Text>
							<Text style={exerciseStyle.title}>
								{" "}
								The Incline Bench Press is a version of the
								traditional Bench Press in which the bench is
								positioned at about a 45-degree angle. The
								resulting inclined position targets your upper
								chest and the frontside of your shoulders more
								the the standard flat bench.
							</Text>
						</View>
					</ScrollView>
				</View>
			);
			break;
		case 32:
			//DECLINE PRESS EXERCISE============================================
			return (
				<View style={views.Home}>
					<Image
						source={require("./../../img/decline_press.png")}
						style={image.Touchable}
					/>
					<YoutubePlayer
						height={200}
						width={300}
						play={playing}
						videoId={"0xRvl4Qv3ZY"}
						onChangeState={onStateChange}
					/>
					<ScrollView>
						<View style={exerciseStyle.wrapPara}>
						<Text style={exerciseStyle.title}>
						Total sets = 3, Rep range: 10, 10, 10
						</Text>
						<Text style={exerciseStyle.title}>
						Total time duration for this exercise: 7 minutes
						</Text>
						<Text style={exerciseStyle.title}>
						Rest pause between each set: 45-60 seconds
							</Text>
							<Text style={exerciseStyle.title}>
								{" "}
								The decline bench press is an excellent exercise
								for strengthening your lower chest muscles. ...
								In a decline bench press, the bench is set to 15
								to 30 degrees on a decline. This angle places
								your upper body on a downward slope, which
								activates the lower pectoral muscles as you push
								weights away from your body.
							</Text>
						</View>
					</ScrollView>
				</View>
			);
			break;
		case 33:
			//INCLINE FLY EXERCISE============================================
			return (
				<View style={views.Home}>
					<Image
						source={require("./../../img/incline_fly.png")}
						style={image.Touchable}
					/>
					<YoutubePlayer
						height={200}
						width={300}
						play={playing}
						videoId={"6rr5p1jCZC4"}
						onChangeState={onStateChange}
					/>
					<ScrollView>
						<View style={exerciseStyle.wrapPara}>
						<Text style={exerciseStyle.title}>
						Total sets = 4, Rep range: 12, 10, 10, 8
						</Text>
						<Text style={exerciseStyle.title}>
						Total time duration for this exercise: 8 minutes
						</Text>
						<Text style={exerciseStyle.title}>
						Rest pause between each set: 45-60 seconds
							</Text>
							<Text style={exerciseStyle.title}>
								{" "}
								The incline dumbbell fly is an isolated strength
								exercise that targets the upper chest muscle.
								Because of the incline bench position, it allows
								for isolation of the harder to develop upper
								pectorals not achieved performing a basic flat
								bench fly.
							</Text>
						</View>
					</ScrollView>
				</View>
			);
			break;
		case 34:
			//FLY EXERCISE============================================
			return (
				<View style={views.Home}>
					<Image
						source={require("./../../img/fly.png")}
						style={image.Touchable}
					/>
					<YoutubePlayer
						height={200}
						width={300}
						play={playing}
						videoId={"u56jywgbvE4"}
						onChangeState={onStateChange}
					/>
					<ScrollView>
						<View style={exerciseStyle.wrapPara}>
						<Text style={exerciseStyle.title}>
						Total sets = 3, Rep range: 12, 10, 8
						</Text>
						<Text style={exerciseStyle.title}>
						Total time duration for this exercise: 7 minutes
						</Text>
						<Text style={exerciseStyle.title}>
						Rest pause between each set: 45-60 seconds
							</Text>
							<Text style={exerciseStyle.title}>
								{" "}
								The fly machine is ideal for increasing chest
								strength and muscle mass by targeting the
								pectoralis muscles. You have two sets of
								pectoral muscles on each side of the front of
								your chest: the pectoralis major and the
								pectoralis minor. This exercise primarily
								benefits the pectoralis major—the larger of the
								two muscles that are responsible for movement at
								the shoulder joint.
							</Text>
						</View>
					</ScrollView>
				</View>
			);
			break;
		case 35:
			//CLOSE-GRIP PRESS EXERCISE============================================
			return (
				<View style={views.Home}>
					<Image
						source={require("./../../img/closegrip.png")}
						style={image.Touchable}
					/>
					<YoutubePlayer
						height={200}
						width={300}
						play={playing}
						videoId={"vEUyEOVn3yM"}
						onChangeState={onStateChange}
					/>
					<ScrollView>
						<View style={exerciseStyle.wrapPara}>
						<Text style={exerciseStyle.title}>
						Total sets = 3, Rep range: 12, 10, 8
						</Text>
						<Text style={exerciseStyle.title}>
						Total time duration for this exercise: 7 minutes
						</Text>
						<Text style={exerciseStyle.title}>
						Rest pause between each set: 45-60 seconds
							</Text>
							<Text style={exerciseStyle.title}>
								{" "}
								The close grip bench press is an upper body
								compound exercise that targets the triceps
								muscles. The secondary muscles involved are your
								chest and shoulders. ... Because the chest and
								shoulders assist the movement, the close grip
								press has the potential for heavier lift loads
								and maximum strength gains.
							</Text>
						</View>
					</ScrollView>
				</View>
			);
			break;
		case 36:
			//DYNAMIC ARM SWING STRETCH============================================
			return (
				<View style={views.Home}>
					<Image
						source={require("./../../img/dynamicarmswing.png")}
						style={image.Touchable}
					/>
					<YoutubePlayer
						height={200}
						width={300}
						play={playing}
						videoId={"VFIoWrzfO3g"}
						onChangeState={onStateChange}
					/>
					<ScrollView>
						<View style={exerciseStyle.wrapPara}>
						<Text style={exerciseStyle.title}>
						Total sets = 3, Rep range: 1 minute to 45 seconds each set
						</Text>
						<Text style={exerciseStyle.title}>
						Total time duration for this exercise: 7 minutes
						</Text>
						<Text style={exerciseStyle.title}>
						Rest pause between each set: 45-60 seconds
							</Text>
							<Text style={exerciseStyle.title}>
								{" "}
								Swing your arms in front of you (first right,
								then left), progressing higher as tolerated.
								Then swing your arms out to your sides and
								across your body. This activates and stretches
								muscles of the shoulder, back and chest.
							</Text>
						</View>
					</ScrollView>
				</View>
			);
			break;
		case 37:
			//DYNAMIC ARM AND SHOULDER SWINGS STRETCH============================================
			return (
				<View style={views.Home}>
					<Image
						source={require("./../../img/armshoulderswing.png")}
						style={image.Touchable}
					/>
					<YoutubePlayer
						height={200}
						width={300}
						play={playing}
						videoId={"jVzCLgiatuY"}
						onChangeState={onStateChange}
					/>
					<ScrollView>
						<View style={exerciseStyle.wrapPara}>
						<Text style={exerciseStyle.title}>
						Total sets = 3, Rep range: 1 minute to 45 seconds each set
						</Text>
						<Text style={exerciseStyle.title}>
						Total time duration for this exercise: 7 minutes
						</Text>
						<Text style={exerciseStyle.title}>
						Rest pause between each set: 45-60 seconds
							</Text>
							<Text style={exerciseStyle.title}>
								{" "}
								Swing your arms in front of you (first right,
								then left), progressing higher as tolerated.
								Then swing your arms out to your sides and
								across your body. This activates and stretches
								muscles of the shoulder, back and chest. Keep
								your feet shoulder-width apart and knees
								slightly bent for each of these.
							</Text>
						</View>
					</ScrollView>
				</View>
			);
			break;
		case 38:
			//ARM PRAYER STRETCH============================================
			return (
				<View style={views.Home}>
					<Image
						source={require("./../../img/armprayer.png")}
						style={image.Touchable}
					/>
					<YoutubePlayer
						height={200}
						width={300}
						play={playing}
						videoId={"XnJu70SLsJk"}
						onChangeState={onStateChange}
					/>
					<ScrollView>
						<View style={exerciseStyle.wrapPara}>
						<Text style={exerciseStyle.title}>
						Total sets = 3, Rep range: 1 minute to 45 seconds each set
						</Text>
						<Text style={exerciseStyle.title}>
						Total time duration for this exercise: 7 minutes
						</Text>
						<Text style={exerciseStyle.title}>
						Rest pause between each set: 45-60 seconds
						</Text>
							<Text style={exerciseStyle.title}>
								{" "}
								Start with your palms together in front of your
								chest just below your chin. Slowly lower your
								hands toward your waistline, keeping your hands
								close to your stomach and your palms together
								until you feel a mild to moderate stretch under
								your forearms. Hold for at least 15 to 30
								seconds.
							</Text>
						</View>
					</ScrollView>
				</View>
			);
			break;
		case 39:
			//COBRA POSE ABS STRETCH============================================
			return (
				<View style={views.Home}>
					<Image
						source={require("./../../img/cobra.png")}
						style={image.Touchable}
					/>
					<YoutubePlayer
						height={200}
						width={300}
						play={playing}
						videoId={"XU0wJ0OTopU"}
						onChangeState={onStateChange}
					/>
					<ScrollView>
						<View style={exerciseStyle.wrapPara}>
						<Text style={exerciseStyle.title}>
						Total sets = 3, Rep range: 1 minute to 45 seconds each set
						</Text>
						<Text style={exerciseStyle.title}>
						Total time duration for this exercise: 7 minutes
						</Text>
						<Text style={exerciseStyle.title}>
						Rest pause between each set: 45-60 seconds
						</Text>
							<Text style={exerciseStyle.title}>
								{" "}
								Start by lying on the floor face down with your
								hands under your shoulders. Keep your hips on
								the floor as you lift your upper body with your
								arms so your chest is out and you’re facing
								forward. Hold the stretch for 20 to 30 seconds,
								return to the resting position, then repeat 2 to
								4 times.
							</Text>
						</View>
					</ScrollView>
				</View>
			);
			break;
		case 40:
			//Standing Oblique Stretch============================================
			return (
				<View style={views.Home}>
					<Image
						source={require("./../../img/standingob.png")}
						style={image.Touchable}
					/>
					<YoutubePlayer
						height={200}
						width={300}
						play={playing}
						videoId={"9fl5X-GwDi4"}
						onChangeState={onStateChange}
					/>
					<ScrollView>
						<View style={exerciseStyle.wrapPara}>
						<Text style={exerciseStyle.title}>
						Total sets = 3, Rep range: 1 minute to 45 seconds each set
						</Text>
						<Text style={exerciseStyle.title}>
						Total time duration for this exercise: 7 minutes
						</Text>
						<Text style={exerciseStyle.title}>
						Rest pause between each set: 45-60 seconds
						</Text>
							<Text style={exerciseStyle.title}>
								{" "}
								While standing raise one arm up and over your
								head as you lean to the opposite side (of the
								raised arm) without lifting the hip. Hold for
								10-15 seconds, then repeat on the other side.
							</Text>
						</View>
					</ScrollView>
				</View>
			);
			break;
		case 41:
			//Twisting crocodile stretch ============================================
			return (
				<View style={views.Home}>
					<Image
						source={require("./../../img/croc.png")}
						style={image.Touchable}
					/>
					<YoutubePlayer
						height={200}
						width={300}
						play={playing}
						videoId={"Digila75vCY"}
						onChangeState={onStateChange}
					/>
					<ScrollView>
						<View style={exerciseStyle.wrapPara}>
						<Text style={exerciseStyle.title}>
						Total sets = 3, Rep range: 1 minute to 45 seconds each set
						</Text>
						<Text style={exerciseStyle.title}>
						Total time duration for this exercise: 7 minutes
						</Text>
						<Text style={exerciseStyle.title}>
						Rest pause between each set: 45-60 seconds
						</Text>
							<Text style={exerciseStyle.title}>
								{" "}
								Lay down on an exercise mat or carpet with your
								back against the floor. Keep your right leg
								straight and bring your left leg up. Bend the
								knee, placing the left foot flat against the
								front of your right ankle. Stretch your arms out
								to your sides. Look to the left, then slowly
								twist your hips to the right.
							</Text>
						</View>
					</ScrollView>
				</View>
			);
			break;
		case 42:
			//Toe Touch Stretch============================================
			return (
				<View style={views.Home}>
					<Image
						source={require("./../../img/toetouch.png")}
						style={image.Touchable}
					/>
					<YoutubePlayer
						height={200}
						width={300}
						play={playing}
						videoId={"pb2Pk23jUXo"}
						onChangeState={onStateChange}
					/>
					<ScrollView>
						<View style={exerciseStyle.wrapPara}>
						<Text style={exerciseStyle.title}>
						Total sets = 3, Rep range: 1 minute to 45 seconds each set
						</Text>
						<Text style={exerciseStyle.title}>
						Total time duration for this exercise: 7 minutes
						</Text>
						<Text style={exerciseStyle.title}>
						Rest pause between each set: 45-60 seconds
						</Text>
							<Text style={exerciseStyle.title}>
								{" "}
								This stretch is commonly used to test someone's
								general flexibility. If you can't touch your
								toes then consider adding more stretching to
								your routine.
							</Text>
						</View>
					</ScrollView>
				</View>
			);
			break;
		case 43:
			//Standing Foot Grab Stretch============================================
			return (
				<View style={views.Home}>
					<Image
						source={require("./../../img/standingfootgrab.png")}
						style={image.Touchable}
					/>
					<YoutubePlayer
						height={200}
						width={300}
						play={playing}
						videoId={"9vTdB9SD_LA"}
						onChangeState={onStateChange}
					/>
					<ScrollView>
						<View style={exerciseStyle.wrapPara}>
						<Text style={exerciseStyle.title}>
						Total sets = 3, Rep range: 1 minute to 45 seconds each set
						</Text>
						<Text style={exerciseStyle.title}>
						Total time duration for this exercise: 7 minutes
						</Text>
						<Text style={exerciseStyle.title}>
						Rest pause between each set: 45-60 seconds
						</Text>
							<Text style={exerciseStyle.title}>
								{""}
								This stretch focuses on the muscles in the front
								of your thigh, the quadriceps.
							</Text>
						</View>
					</ScrollView>
				</View>
			);
			break;
		case 44:
			//Wall Hamstring Stretch ============================================
			return (
				<View style={views.Home}>
					<Image
						source={require("./../../img/wallham.png")}
						style={image.Touchable}
					/>
					<YoutubePlayer
						height={200}
						width={300}
						play={playing}
						videoId={"2U4ChnuL3JM"}
						onChangeState={onStateChange}
					/>
					<ScrollView>
						<View style={exerciseStyle.wrapPara}>
						<Text style={exerciseStyle.title}>
						Total sets = 3, Rep range: 1 minute to 45 seconds each set
						</Text>
						<Text style={exerciseStyle.title}>
						Total time duration for this exercise: 7 minutes
						</Text>
						<Text style={exerciseStyle.title}>
						Rest pause between each set: 45-60 seconds
						</Text>
							<Text style={exerciseStyle.title}>
								{" "}
								Work on each hamstring individually with this
								stretch.
							</Text>
						</View>
					</ScrollView>
				</View>
			);
			break;
		case 45:
			//Shoulder rolls ============================================
			return (
				<View style={views.Home}>
					<Image
						source={require("./../../img/shoulderrolls.png")}
						style={image.Touchable}
					/>
					<YoutubePlayer
						height={200}
						width={300}
						play={playing}
						videoId={"w8yCm_sFUo4"}
						onChangeState={onStateChange}
					/>
					<ScrollView>
						<View style={exerciseStyle.wrapPara}>
						<Text style={exerciseStyle.title}>
						Total sets = 3, Rep range: 1 minute to 45 seconds each set
						</Text>
						<Text style={exerciseStyle.title}>
						Total time duration for this exercise: 7 minutes
						</Text>
						<Text style={exerciseStyle.title}>
						Rest pause between each set: 45-60 seconds
						</Text>
							<Text style={exerciseStyle.title}>
								{" "}

								Shoulder rolls are an easy way to stretch the
								shoulders.
							</Text>
						</View>
					</ScrollView>
				</View>
			);
			break;
		case 46:
			//Cross-body shoulder stretch============================================
			return (
				<View style={views.Home}>
					<Image
						source={require("./../../img/crossbody.png")}
						style={image.Touchable}
					/>
					<YoutubePlayer
						height={200}
						width={300}
						play={playing}
						videoId={"XMsBC9-vSDs"}
						onChangeState={onStateChange}
					/>
					<ScrollView>
						<View style={exerciseStyle.wrapPara}>
						<Text style={exerciseStyle.title}>
						Total sets = 3, Rep range: 1 minute to 45 seconds each set
						</Text>
						<Text style={exerciseStyle.title}>
						Total time duration for this exercise: 7 minutes
						</Text>
						<Text style={exerciseStyle.title}>
						Rest pause between each set: 45-60 seconds
						</Text>
							<Text style={exerciseStyle.title}>
								Bring one arm across the front of your body.
								Place opposite hand above elbow and pull in
								toward your body. Hold 10-30 seconds. Repeat on
								opposite arm.
							</Text>
						</View>
					</ScrollView>
				</View>
			);
			break;
		case 47:
			//Cow Face pose============================================
			return (
				<View style={views.Home}>
					<Image
						source={require("./../../img/cowfacepose.png")}
						style={image.Touchable}
					/>
					<YoutubePlayer
						height={200}
						width={300}
						play={playing}
						videoId={"-acLT1lsMYo"}
						onChangeState={onStateChange}
					/>
					<ScrollView>
						<View style={exerciseStyle.wrapPara}>
						<Text style={exerciseStyle.title}>
						Total sets = 3, Rep range: 1 minute to 45 seconds each set
						</Text>
						<Text style={exerciseStyle.title}>
						Total time duration for this exercise: 7 minutes
						</Text>
						<Text style={exerciseStyle.title}>
						Rest pause between each set: 45-60 seconds
						</Text>
							<Text style={exerciseStyle.title}>
								{" "}
								Cow Face Pose is a seated yoga posture that
								deeply stretches the hips and shoulders. It
								calms the mind and brings balance to the whole
								body. Due to a lifetime of incorrect postural
								habits, many people are imbalanced between the
								left and right sides of the body.{" "}
							</Text>
						</View>
					</ScrollView>
				</View>
			);
			break;

		case 48:
			//Low Back Stretch============================================
			return (
				<View style={views.Home}>
					<Image
						source={require("./../../img/lowerbackstretch.png")}
						style={image.Touchable}
					/>
					<YoutubePlayer
						height={200}
						width={300}
						play={playing}
						videoId={"qTJVfiM1Zhw"}
						onChangeState={onStateChange}
					/>
					<ScrollView>
						<View style={exerciseStyle.wrapPara}>
						<Text style={exerciseStyle.title}>
						Total sets = 3, Rep range: 1 minute to 45 seconds each set
						</Text>
						<Text style={exerciseStyle.title}>
						Total time duration for this exercise: 7 minutes
						</Text>
						<Text style={exerciseStyle.title}>
						Rest pause between each set: 45-60 seconds
						</Text>
							<Text style={exerciseStyle.title}>
								{" "}
								Lay on a flat surface with knees bent. Pull one
								knee in toward your chest. Hold 10-30 seconds.
								Repeat on opposite leg.
							</Text>
						</View>
					</ScrollView>
				</View>
			);
			break;
		case 49:
			//Rhomboid Stretch============================================
			return (
				<View style={views.Home}>
					<Image
						source={require("./../../img/rhomboid.png")}
						style={image.Touchable}
					/>
					<YoutubePlayer
						height={200}
						width={300}
						play={playing}
						videoId={"x"}
						onChangeState={onStateChange}
					/>
					<ScrollView>
						<View style={exerciseStyle.wrapPara}>
						<Text style={exerciseStyle.title}>
						Total sets = 3, Rep range: 1 minute to 45 seconds each set
						</Text>
						<Text style={exerciseStyle.title}>
						Total time duration for this exercise: 7 minutes
						</Text>
						<Text style={exerciseStyle.title}>
						Rest pause between each set: 45-60 seconds
						</Text>
							<Text style={exerciseStyle.title}>
								{" "}
								The rhomboids help squeeze the scapula (shoulder
								blade) towards the spine.
							</Text>
						</View>
					</ScrollView>
				</View>
			);
			break;
		case 50:
			//Cat And Cow Stretch============================================
			return (
				<View style={views.Home}>
					<Image
						source={require("./../../img/catcow.png")}
						style={image.Touchable}
					/>
					<YoutubePlayer
						height={200}
						width={300}
						play={playing}
						videoId={"tT00XNqJ3uA"}
						onChangeState={onStateChange}
					/>
					<ScrollView>
						<View style={exerciseStyle.wrapPara}>
						<Text style={exerciseStyle.title}>
						Total sets = 3, Rep range: 1 minute to 45 seconds each set
						</Text>
						<Text style={exerciseStyle.title}>
						Total time duration for this exercise: 7 minutes
						</Text>
						<Text style={exerciseStyle.title}>
						Rest pause between each set: 45-60 seconds
						</Text>
							<Text style={exerciseStyle.title}>
								{" "}
								The Cat Cow Pose is the best stretch for your
								back pain.
							</Text>
						</View>
					</ScrollView>
				</View>
			);
			break;
		case 51:
			//Corner Chest Stretch============================================
			return (
				<View style={views.Home}>
					<Image
						source={require("./../../img/corner.png")}
						style={image.Touchable}
					/>
					<YoutubePlayer
						height={200}
						width={300}
						play={playing}
						videoId={"Kvo7054R3fQ"}
						onChangeState={onStateChange}
					/>
					<ScrollView>
						<View style={exerciseStyle.wrapPara}>
						<Text style={exerciseStyle.title}>
						Total sets = 3, Rep range: 1 minute to 45 seconds each set
						</Text>
						<Text style={exerciseStyle.title}>
						Total time duration for this exercise: 7 minutes
						</Text>
						<Text style={exerciseStyle.title}>
						Rest pause between each set: 45-60 seconds
						</Text>
							<Text style={exerciseStyle.title}>
								{" "}
								Find a corner in your house and stand in a
								staggered stance, with your legs slightly bent.
								Stand 1 foot (0.30 m) away from the corner. Your
								dominant foot should be closer to the corner
								than the rest of your body. Your back should be
								straight and your shoulders should be squared.
							</Text>
						</View>
					</ScrollView>
				</View>
			);
			break;
		case 52:
			//Above-the-Head Chest Stretch============================================
			return (
				<View style={views.Home}>
					<Image
						source={require("./../../img/abovethehead.png")}
						style={image.Touchable}
					/>
					<YoutubePlayer
						height={200}
						width={300}
						play={playing}
						videoId={"aZc-zYtFyDU"}
						onChangeState={onStateChange}
					/>
					<ScrollView>
						<View style={exerciseStyle.wrapPara}>
						<Text style={exerciseStyle.title}>
						Total sets = 3, Rep range: 1 minute to 45 seconds each set
						</Text>
						<Text style={exerciseStyle.title}>
						Total time duration for this exercise: 7 minutes
						</Text>
						<Text style={exerciseStyle.title}>
						Rest pause between each set: 45-60 seconds
						</Text>
							<Text style={exerciseStyle.title}>
								{" "}
								Seated or standing, interlock your fingers, bend
								your elbows and raise your arms above your head.
								Gently squeeze your shoulder blades together and
								move your elbows and hands backward. Vary the
								height of your hands to emphasize shoulders
								and/or chest (hands behind head, hands on top of
								head, hand a few inches above head).
							</Text>
						</View>
					</ScrollView>
				</View>
			);
			break;
		case 53:
			//Door Chest Stretch ============================================
			return (
				<View style={views.Home}>
					<Image
						source={require("./../../img/doorchest.png")}
						style={image.Touchable}
					/>
					<YoutubePlayer
						height={200}
						width={300}
						play={playing}
						videoId={"rT7rgXQtDcI"}
						onChangeState={onStateChange}
					/>
					<ScrollView>
						<View style={exerciseStyle.wrapPara}>
						<Text style={exerciseStyle.title}>
						Total sets = 3, Rep range: 1 minute to 45 seconds each set
						</Text>
						<Text style={exerciseStyle.title}>
						Total time duration for this exercise: 7 minutes
						</Text>
						<Text style={exerciseStyle.title}>
						Rest pause between each set: 45-60 seconds
						</Text>
							<Text style={exerciseStyle.title}>
								{" "}
								Stand in an open doorway. Raise each arm up to
								the side, bent at 90-degree angles with palms
								forward. Rest your palms on the door frame.
								Slowly step forward with one foot. Feel the
								stretch in your shoulders and chest.
							</Text>
						</View>
					</ScrollView>
				</View>
			);
			break;

		default:
			return (
				<View style={views.Home}>
					<Text style={exerciseStyle.title}>failed</Text>
					<Text style={exerciseStyle.title}> test Text</Text>
				</View>
			);
	}
}
export {DisplayExercise};
