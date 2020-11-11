 src="https://d309knd7es5f10.cloudfront.net/vee/vee.js";
 src="https://zimjs.org/cdn/1.2.3/createjs_min.js";
 src="https://zimjs.org/cdn/10.7.1/zim.js";
 src="https://zimjs.org/cdn/marquee/marquee_04.js";

var scaling = "Creative";
var frame2 = new Frame({scaling,retina:true,
    captureMouse:false,
    rollover:false,
    allowDefault:true
});
frame2.on("ready", function() { // ES6 Arrow Function
    zog("ready from ZIM Frame"); // logs in console (F12 - choose console)

    var stage = frame2.stage;
    var stageW = frame2.width;
    var stageH = frame2.height;

    frame2.canvas.style.position = "absolute";
    frame2.canvas.style.zIndex = 5;
    frame2.canvas.style.pointerEvents = "none";

    var words = ["Jessica", "Farias", "Jessica\nFarias","Ruby","React","CSS", "HTML", "C#", "Ladder", "PLC", "SolidWorks", "JavaScript", "Java", "SQL", "Visual\nStudio", "VSC", "MySQL", 
    "SASS", "c++", "Photoshop", "Proteus", "SQLite", "Android", "Web\nDeveloper", "Mecatronics", 
    "pgadmin", "Google\nCloud", "SIEMENS", "Automation"];
    var planets = []; // pool circles
    var count = 0;
    timeout(5, function () {
        interval({min:100, max:1000}, function (obj) {
            var JesNum=rand(60,100);
            if (planets.length < words.length) {
                var c = new Circle(JesNum).ble("difference");
                c.label = new Label(words[count], 30, null, white, white, {backgroundColor:black}).centerReg(c);
                planets.push(c);//Javascript
            } else {
                var c = planets[count];
            }
            c.sca(.5).reg(0).center(stage).mov(rand(-stageW,stageW),rand(-stageH,stageH)).bot().ord(1).alp(0).rot(rand(360))
                .animate({alpha:1}, 5500)
                .animate({
                    props:{regX:stageW/2, scale:1.5},
                    time:22000,
                    call:function (target) {
                        target.animate({alpha:0}, 3000);
                    }
                });
            c.color = Pick.choose(["#5ACCD970","#48A3AD70","#3F8F9670","#53C9C170","#3B8E8770 ","#21AFA170"]);
            c.label.rot(-c.rotation+rand(-10,10));
            if (count == words.length-1) {
                obj.pause();
                count = 0;
                timeout(100, function () {
                    obj.pause(false)
                });
            } else {
                count++;
            }
        });
    });

    frame2.on("resize", function () {
        stageW = windowWidth();
        stageH = windowHeight()*(0.005);
    });
});

function Alert(){
    window.alert("Se rediccionará la página a MEGA \npara la descarga (DESCARGA SEGURA)");
    window.location.href = 'https://mega.nz/fm/https://mega.nz/#!3FBmkKaZ!cfqIp-UkP1AQHlxIdl1ka_i7t0xb-SKLxsm8rfUmzsg';
}

function Fade(){
    docment.querySelector('body').classList.add('fadeout');
}

function init() {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
    renderer = new THREE.CSS3DRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight*0.85);
    renderer.domElement.style.position = 'absolute';
    renderer.domElement.style.top = 0;
    camera.position.x = 1200;
    camera.position.y = 1200;
    camera.position.z = 1200;
    camera.lookAt(scene.position);

    controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.autoRotate = true;

    control = new function () {
        this.toCube = function (e) {
            updateStructure(new THREE.BoxGeometry(20, 14, 20, 5, 3, 5), 40);
        };
        this.toCylinder = function () {
            updateStructure(new THREE.CylinderGeometry(12, 12, 27, 15, 7, true), 40);
        };
        this.toSphere = function () {
            updateStructure(new THREE.SphereGeometry(17, 10, 10), 40);
        };
        this.toPlane = function () {
            updateStructure(new THREE.TorusGeometry(20,10,8,10),25);

        };
    };

    addStatsObject();
    document.body.appendChild(renderer.domElement);

    addControlGui(control);


    updateStructure(new THREE.PlaneGeometry(30, 30, 8, 8), 40);
    render();
}

function createCSS3DObject(iFace) {
    var div = document.createElement('div');
    var img = document.createElement('img');

    var nrString = "01"+ String(Math.floor((Math.random() * 9) + 1));
    img.src = 'assets/screens/WALL-E-' + nrString + ".jpg";
    img.width = 140;


    div.appendChild(img);
    div.style.opacity = 0.8;

    var object = new THREE.CSS3DObject(div);
    object.name = 'test';

    return object;
}

function updateStructure(geometry, offset) {
    // get the position where we need to move elements to
    positionAndRotation = getPositionAndRotation(geometry, offset);

    // the tweein, will be used to make all the new elements
    // slowly visible
    var tweenIn = new TWEEN.Tween({opacity: 0})
            .to({pos: 1.0}, 3000)
            .easing(TWEEN.Easing.Sinusoidal.InOut)
            .onUpdate(function () {
                var toSet = this.pos;
                newlyAddedElements.forEach(function (cssObject) {
                    cssObject.element.style.opacity = toSet;
                });

                var i = 0;
                currentElements.forEach(function (cssObject) {
                    // get the elements start position and target position
                    var currentPos = positionAndRotation[i].currentPos;
                    var targetPos = positionAndRotation[i].pos;

                    // also get the elements start rotation and end rotations
                    var currentRotation = positionAndRotation[i].currentRotation;
                    var targetRotation = new THREE.Euler();
                    targetRotation.setFromRotationMatrix(positionAndRotation[i].rot);

                    // use the tween to slowly move the elements around.
                    if (currentPos) {
                        cssObject.position.x = currentPos.x + (targetPos.x - currentPos.x) * toSet;
                        cssObject.position.y = currentPos.y + (targetPos.y - currentPos.y) * toSet;
                        cssObject.position.z = currentPos.z + (targetPos.z - currentPos.z) * toSet;

                        cssObject.rotation.x = currentRotation.x + (targetRotation.x - currentRotation.x) * toSet;
                        cssObject.rotation.y = currentRotation.y + (targetRotation.y - currentRotation.y) * toSet;
                        cssObject.rotation.z = currentRotation.z + (targetRotation.z - currentRotation.z) * toSet;
                    }
                    i++;
                });
            });

    tweenIn.start();

    // some cleanup
    newlyAddedElements = [];
    toBeRemovedElements = [];

    // walk through the positionAndRotation set and either move or create the elements
    for (var i = 0; i < positionAndRotation.length; i++) {

        if (currentElements.length > i) {
            // we need to move one of the existing ones.
            var element = currentElements[i];
            positionAndRotation[i].currentPos = element.position.clone();
            positionAndRotation[i].currentRotation = element.rotation.clone();
        } else {
            // create a new one, and set it's position of screen
            var element = createCSS3DObject(i + 1);

            element.position = offscreen.clone();

            positionAndRotation[i].currentPos = element.position.clone();
            positionAndRotation[i].currentRotation = element.rotation.clone();

            // set initial opacity to 0.
            element.element.style.opacity = 0;

            // add to the array to keep track of.
            currentElements.push(element);
            newlyAddedElements.push(element);
            scene.add(element);
        }
    }

    // finally remove the elements that aren't needed anymore
    for (var i = positionAndRotation.length; i < currentElements.length; i++) {
        toBeRemovedElements.push(currentElements[i]);
    }

    // and remove them from the scene
    for (var i = 0; i < toBeRemovedElements.length; i++) {
        scene.remove(currentElements.pop());
    }
}

/**
 *
 *
 * {
     *  pos: THREE.Vector3(),
     *  rot: THREE.Matrix4()
     * }
 *
 * @param geometry
 */
function getPositionAndRotation(geometry, offset) {
    var result = [];

    for (var iFace = 0; iFace < geometry.faces.length; iFace += 2) {
        var newPosition = new THREE.Vector3(0, 0, 0);

        // get this face and the next which both make the cube
        var face = geometry.faces[iFace];
        var faceNext = geometry.faces[iFace + 1];

        // calculate the position of where the elements need to go to.
        var centroid = new THREE.Vector3();
        centroid.copy( geometry.vertices[face.a] )
                .add( geometry.vertices[face.b] )
                .add( geometry.vertices[face.c] )
                .add( geometry.vertices[faceNext.a] )
                .add( geometry.vertices[faceNext.b] )
                .add( geometry.vertices[faceNext.c] )
                .divideScalar( 6 ).multiplyScalar(offset);

        newPosition = centroid.clone();

        // Now we need to rotate the div to the correct position
        var up = new THREE.Vector3(0, 0, 1);

        // we get the vector from both of the triangle, and use the average
        var normal = new THREE.Vector3();
        normal.addVectors(face.normal, faceNext.normal);
        normal.divideScalar(2);

        // We calculate the axis on which to rotate by
        // selecting the cross of the vectors
        var axis = new THREE.Vector3();
        axis.crossVectors(up, normal);

        // based on the axis, in relation to our normal vector
        // we can calculate the angle.
        var angle = Math.atan2(axis.length(), up.dot(normal));
        axis.normalize();

        // now we can use matrix function to rotate the object so
        // it is aligned with the normal from the face
        var rotationToApply = new THREE.Matrix4();
        rotationToApply.makeRotationAxis(axis, angle);

        result.push({pos: newPosition, rot: rotationToApply});
    }

    return result;
}

function getCenter(object, face) {

    console.log(face);
    var a = object.vertices[face.a];
    var b = object.vertices[face.b];
    var c = object.vertices[face.c];

    var added = new THREE.Vector3();
    added.add(a);
    added.add(b);
    added.add(c);

    console.log(added);


    return added;
}


function addControlGui(controlObject) {
    var gui = new dat.GUI();
    gui.add(controlObject, "toCube");
    gui.add(controlObject, "toSphere");
    gui.add(controlObject, "toCylinder");
    gui.add(controlObject, "toPlane");
}

function addStatsObject() {
    stats = new Stats();
    stats.setMode(0);

    stats.domElement.style.position = 'absolute';
    stats.domElement.style.left = '0px';
    stats.domElement.style.top = '0px';

    document.body.appendChild(stats.domElement);
}

function render() {

    TWEEN.update();

    // update stats
    stats.update();

    controls.update();

    // and render the scene
    renderer.render(scene, camera);

    // render using requestAnimationFrame
    requestAnimationFrame(render);
}

function handleResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

function handleSubmit(e) {
    if (e.keyCode == 13) {
        console.log(document.getElementById("queryField").value);
    }
}
window.onload = init;
window.addEventListener('resize', handleResize, false);