import { Formik } from "formik";
import * as Yup from "yup";
import { useNavigation, useLocalSearchParams } from "expo-router";
import { useVideoGameContext } from "@/components/ui/games-context-provider";
import { Box } from "@/components/ui/box";
import { Text } from "@/components/ui/text";
import { Input, InputField } from "@/components/ui/input";
import { Button, ButtonText } from "@/components/ui/button";
import {
  Checkbox,
  CheckboxIndicator,
  CheckboxLabel,
  CheckboxIcon,
} from "@/components/ui/checkbox";
import { CheckIcon } from "@/components/ui/icon";

const VideoGameSchema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  genre: Yup.string().required("Genre is required"),
  completed: Yup.bool().required("Completion Status is required"),
});

const AddVideoGame = () => {
  const navigation = useNavigation();
  const { id = "" } = useLocalSearchParams<{ id: string }>();
  const { addVideoGame, videoGames, updateVideoGame } = useVideoGameContext();
  const editVideoGame = videoGames.find((item) => item.id === id);

  const initialValues = editVideoGame
    ? {
        title: editVideoGame.title,
        genre: editVideoGame.genre,
        completed: editVideoGame.completed,
      }
    : {
        title: "",
        genre: "",
        completed: false,
      };

  return (
    <Box className="flex-1 p-4 dark:bg-neutral-950">
      <Formik
        initialValues={initialValues}
        validationSchema={VideoGameSchema}
        onSubmit={(values, { resetForm }) => {
          if (editVideoGame) {
            updateVideoGame({
              ...editVideoGame,
              title: values.title,
              genre: values.genre,
              completed: values.completed,
            });
          } else {
            addVideoGame({
              title: values.title,
              genre: values.genre,
              completed: values.completed,
            });
          }

          resetForm();

          navigation.goBack();
        }}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
          setFieldValue,
        }) => (
          <Box>
            {/* Title Input */}
            <Box className="mb-4">
              <Text size="lg" className="mb-2 text-stone-900 dark:text-white">
                Name
              </Text>
              <Input
                variant="outline"
                size="md"
                className="bg-white dark:bg-zinc-900 mt-2"
              >
                <InputField
                  onChangeText={handleChange("title")}
                  onBlur={handleBlur("title")}
                  value={values.title}
                  placeholder="Enter Video Game title"
                />
              </Input>
              {touched.title && errors.title && (
                <Text size="sm" className="text-red-500 mt-1">
                  {errors.title}
                </Text>
              )}
            </Box>

            {/* Genre Input */}

            <Box className="mb-4">
              <Text size="lg" className="mb-2 text-stone-900 dark:text-white">
                Genre
              </Text>
              <Input
                variant="outline"
                size="md"
                className="bg-white dark:bg-zinc-900 mt-2"
              >
                <InputField
                  onChangeText={handleChange("genre")}
                  onBlur={handleBlur("genre")}
                  value={values.genre}
                  placeholder="Enter the genre"
                />
              </Input>
              {touched.genre && errors.genre && (
                <Text size="sm" className="text-red-500 mt-1">
                  {errors.genre}
                </Text>
              )}
            </Box>

            {/* Completion Status Checkbox */}

            <Checkbox
              size="md"
              value="completed"
              isChecked={values.completed}
              onChange={(isChecked) => setFieldValue("completed", isChecked)}
              aria-label="Mark as completed"
              className="my-2"
            >
              <CheckboxIndicator className="mr-2">
                <CheckboxIcon as={CheckIcon} />
              </CheckboxIndicator>
              <CheckboxLabel className="text-stone-900 dark:text-white">
                Completed
              </CheckboxLabel>
            </Checkbox>
            {touched.completed && errors.completed && (
              <Text size="sm" className="text-red-500 mt-1">
                {errors.completed}
              </Text>
            )}

            {/* Submit Button */}

            <Button
              action="positive"
              onPress={() => handleSubmit()}
              className="mt-4"
            >
              <ButtonText>Submit</ButtonText>
            </Button>
          </Box>
        )}
      </Formik>
    </Box>
  );
};

export default AddVideoGame;
